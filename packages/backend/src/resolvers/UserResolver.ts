import axios from 'axios';
import { Resolver, Query, Ctx, Mutation, Arg, FieldResolver, Root, Authorized } from 'type-graphql';
import { User, AuthType, GrantType } from '../entity/User';
import { Context } from '../types';
import Result from './types/Result';
import { Organization } from '../entity/Organization';
import SignInResult from './types/SignInResult';
import { OrganizationMembership } from '../entity/OrganizationMembership';
import { UserRepository } from '../repositories/UserRepository';
import { PasswordResetRepository } from '../repositories/PasswordResetRepository';
import { getCustomRepository, getRepository } from 'typeorm';

// TODO: We should probably separate out things that are associated with the "user" (me query, enable/disable totp, updateAccount)
// from things that are associated purely with auth (signup, signin, exchangetotp, forgot password, reset password)

@Resolver(() => User)
export class UserResolver {
    constructor(
        private userRepo = getCustomRepository(UserRepository),
        private passwordResetRepo = getCustomRepository(PasswordResetRepository),
        private organizationRepo = getRepository(Organization),
        private organizationMembershipRepo = getRepository(OrganizationMembership),
    ) {}

    @Authorized()
    @Query(() => User)
    async me(@Ctx() { user }: Context): Promise<User> {
        return user;
    }

    // TODO: The fact that this field exists on all users is a red flag to me.
    // We probably want to move this outside of the user object.
    @Authorized(GrantType.SESSION)
    @FieldResolver()
    onboardTOTP(@Ctx() { user: currentUser }: Context, @Root() user: User): string {
        if (user.id !== currentUser.id) {
            throw new Error('You can only enable TOTP for your own account.');
        }

        if (user.totpSecret) {
            throw new Error('TOTP Already Enabled');
        }

        // TODO: Move this outside of the user model, it doesn't really make sense
        // to be there. We can make a util file that does TOTP stuff.
        return user.generateTotpSecret();
    }

    @Mutation(() => Result)
    async signUp(
        @Ctx() { session, cookies }: Context,
        @Arg('username') username: string,
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
    ) {
        await this.userRepo.signUp(session, cookies, {
            username,
            name,
            email,
            password,
        });

        return new Result();
    }

    @Mutation(() => SignInResult)
    async signIn(
        @Ctx() { session, cookies }: Context,
        @Arg('email') email: string,
        @Arg('password') password: string,
    ) {
        const user = await this.userRepo.findOne({ where: { email } });

        if (!user) {
            throw new Error('No user found.');
        }

        const passwordValid = await user.checkPassword(password);

        if (!passwordValid) {
            throw new Error('Invalid password.');
        }

        // TODO: Move this into the User itself:
        // Remove any password reset so that it is no longer valid after signing in:
        this.passwordResetRepo.removeForUser(user);

        if (user.totpSecret) {
            user.signIn(session, cookies, AuthType.TOTP);

            return new SignInResult(true);
        }

        user.signIn(session, cookies);

        return new SignInResult(false);
    }

    @Mutation(() => SignInResult)
    async gitHubSignIn(@Ctx() { session, cookies }: Context, @Arg('code') code: string) {
        const params = {
            client_id: 'c30bdab49350c27729d7',
            client_secret: 'fa7330d0ae21de0c4c50f33caf954b669f5a69c8',
            code,
        };

        const res = await axios.post('https://github.com/login/oauth/access_token', params, {
            headers: {
                Accept: 'application/json',
            },
        });

        const githubUser = await axios.post(
            'https://api.github.com/graphql',
            {
                query: `
                query {
                    viewer {
                        id
                        login
                        email
                        name
                    }
                }
            `,
            },
            {
                headers: {
                    Authorization: `bearer ${res.data.access_token}`,
                },
            },
        );

        const { viewer } = githubUser.data.data;

        const user = await this.userRepo.findOne({
            where: {
                githubID: viewer.id,
                email: viewer.email,
            },
        });

        if (!user) {
            // TODO: What do we do about the username here?
            await this.userRepo.signUp(session, cookies, {
                username: viewer.login,
                githubID: viewer.id,
                name: viewer.name,
                email: viewer.email,
            });

            return new SignInResult(false);
        }

        // If the user is not passwordless, then we need to prevent them from
        // signing in with just github.
        if (!user.isPasswordless) {
            // TODO: Refine the error message:
            throw new Error('User account is not passwordless.');
        }

        // TODO: Move this into the User itself:
        // Remove any password reset so that it is no longer valid after signing in:
        this.passwordResetRepo.removeForUser(user);

        if (user.totpSecret) {
            user.signIn(session, cookies, AuthType.TOTP);

            return new SignInResult(true);
        }

        user.signIn(session, cookies);

        return new SignInResult(false);
    }

    @Authorized(GrantType.SESSION)
    @Mutation(() => User)
    async updateAccount(
        @Ctx() { user }: Context,
        @Arg('username', { nullable: true }) username?: string,
        @Arg('name', { nullable: true }) name?: string,
        @Arg('email', { nullable: true }) email?: string,
    ) {
        if (username) {
            user.username = username;
            const personalOrganization = await user.personalOrganization;
            personalOrganization.username = username;
            await this.organizationRepo.save(personalOrganization);
        }

        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        return await this.userRepo.save(user);
    }

    @Mutation(() => Result)
    async forgotPassword(@Arg('email') email: string) {
        await this.passwordResetRepo.createForEmail(email);

        return new Result();
    }

    // TODO: Why is this on the user and not just a Query method.
    // TODO: Should we just bite the bullet and make personal organizations returned at
    // the top-level as well. (this would move to be a client concern)
    @FieldResolver(() => [Organization])
    async organizations(@Root() user: User) {
        const memberships = await this.organizationMembershipRepo.find({
            where: {
                user: user,
            },
            relations: ['organization'],
        });

        // TODO: This won't work when we have external collaborators.
        return memberships
            .map(membership => membership.organization)
            .filter(org => !org.isPersonal);
    }

    @Mutation(() => Result)
    async resetPassword(
        @Ctx() { session, cookies }: Context,
        @Arg('uuid') uuid: string,
        @Arg('password') password: string,
    ) {
        const reset = await this.passwordResetRepo.findOne({
            where: { uuid },
            relations: ['user'],
        });

        // TODO: Validate that the date that the password reset was created is with # of days:
        if (!reset) {
            throw new Error('Invalid password reset.');
        }

        if (password) {
            const user = await this.userRepo.fromSession(session, AuthType.PASSWORD_RESET);

            if (!user) {
                throw new Error('Did not find a started password reset.');
            }

            // TODO: Why is this commented out??
            // await reset.remove();

            await user.setPassword(password);
            await this.userRepo.save(user);

            user.signIn(session, cookies);
            return new Result();
        }

        reset.user.signIn(session, cookies, AuthType.PASSWORD_RESET);

        return new Result();
    }

    @Authorized(GrantType.SESSION)
    @Mutation(() => Result)
    signOut(@Ctx() { user, cookies, destroySession }: Context) {
        user.signOut(cookies);
        destroySession();
        return new Result();
    }
}
