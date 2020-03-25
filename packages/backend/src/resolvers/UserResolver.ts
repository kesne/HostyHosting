import { Resolver, Query, Ctx, Mutation, Arg, FieldResolver, Root, Authorized } from 'type-graphql';
import { User, AuthType, GrantType } from '../entity/User';
import { Context } from '../types';
import Result from './types/Result';
import { Organization } from '../entity/Organization';
import SignInResult from './types/SignInResult';
import { PasswordReset } from '../entity/PasswordReset';
import { OrganizationMembership, OrganizationPermission } from '../entity/OrganizationMembership';

// TODO: We should probably separate out things that are associated with the "user" (me query, enable/disable totp, updateAccount)
// from things that are associated purely with auth (signup, signin, exchangetotp, forgot password, reset password)

@Resolver(() => User)
export class UserResolver {
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
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
    ) {
        // First create the users' personal organization:
        const organization = new Organization();
        organization.name = 'Personal';
        organization.isPersonal = true;
        await organization.save();

        // Then create the user themself:
        const user = new User();
        user.name = name;
        user.email = email;
        user.personalOrganization = organization;
        await user.setPassword(password);
        await user.save();

        // Finally, add the user into their own organization:
        const membership = new OrganizationMembership();
        membership.user = user;
        membership.organization = organization;
        membership.permission = OrganizationPermission.ADMIN;
        await membership.save();

        user.signIn(session, cookies);

        return new Result();
    }

    @Mutation(() => SignInResult)
    async signIn(
        @Ctx() { session, cookies }: Context,
        @Arg('email') email: string,
        @Arg('password') password: string,
    ) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('No user found.');
        }

        const passwordValid = await user.checkPassword(password);

        if (!passwordValid) {
            throw new Error('Invalid password.');
        }

        // TODO: Move this into the User itself:
        // Remove any password reset so that it is no longer valid after signing in:
        PasswordReset.removeForUser(user);

        if (user.totpSecret) {
            user.signIn(session, cookies, AuthType.TOTP);

            return {
                ok: true,
                requiresTOTP: true,
            };
        }

        user.signIn(session, cookies);

        return {
            ok: true,
            requiresTOTP: false,
        };
    }

    @Authorized(GrantType.SESSION)
    @Mutation(() => User)
    async updateAccount(
        @Ctx() { user }: Context,
        @Arg('name', { nullable: true }) name?: string,
        @Arg('email', { nullable: true }) email?: string,
    ) {
        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        return await user.save();
    }

    @Mutation(() => Result)
    async forgotPassword(@Arg('email') email: string) {
        await PasswordReset.createForEmail(email);

        return new Result();
    }

    // TODO: Why is this on the user and not just a Query method.
    // TODO: Should we just bite the bullet and make personal organizations returned at
    // the top-level as well. (this would move to be a client concern)
    @FieldResolver(() => [Organization])
    async organizations(@Root() user: User) {
        const memberships = await OrganizationMembership.find({
            where: {
                user: user,
            },
            relations: ['organization']
        });

        // TODO: This won't work when we have external collaborators.
        return memberships.map((membership) => membership.organization).filter((org) => !org.isPersonal);
    }

    @Mutation(() => Result)
    async resetPassword(
        @Ctx() { session, cookies }: Context,
        @Arg('uuid') uuid: string,
        @Arg('password') password: string,
    ) {
        const reset = await PasswordReset.findOne({ where: { uuid }, relations: ['user'] });

        // TODO: Validate that the date that the password reset was created is with # of days:
        if (!reset) {
            throw new Error('Invalid password reset.');
        }

        if (password) {
            const user = await User.fromSession(session, AuthType.PASSWORD_RESET);

            if (!user) {
                throw new Error('Did not find a started password reset.');
            }

            // TODO: Why is this commented out??
            // await reset.remove();

            await user.setPassword(password);
            await user.save();

            user.signIn(session, cookies);
            return new Result();
        }

        reset.user.signIn(session, cookies, AuthType.PASSWORD_RESET);

        return new Result();
    }
}
