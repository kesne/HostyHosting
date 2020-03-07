import { Resolver, Query, Ctx, Mutation, Arg, FieldResolver, Root, Authorized } from 'type-graphql';
import { User, AuthType } from '../entity/User';
import { Context } from '../types';
import Result from './types/Result';
import { Organization } from '../entity/Organization';
import SignInResult from './types/SignInResult';
import { PasswordReset } from '../entity/PasswordReset';

// TODO: We should probably separate out things that are associated with the "user" (me query, enable/disable totp, updateAccount)
// from things that are associated purely with auth (signup, signin, exchangetotp, forgot password, reset password)

@Resolver(() => User)
export class UserResolver {
    @Authorized()
    @Query(() => User)
    async me(@Ctx() { user }: Context): Promise<User> {
        return user;
    }

    @FieldResolver()
    onboardTOTP(@Root() user: User): string {
        if (user.totpSecret) {
            throw new Error('TOTP Already Enabled');
        }

        return user.generateTotpSecret();
    }

    @Mutation(() => Result)
    async signUp(
        @Ctx() { session, cookies }: Context,
        @Arg('organizationName') organizationName: string,
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        const organization = new Organization();
        organization.name = organizationName;
        await organization.save();

        const user = new User();
        user.name = name;
        user.email = email;
        user.organization = Promise.resolve(organization);

        await user.setPassword(password);
        await user.save();

        user.signIn(session, cookies);

        return new Result();
    }

    @Mutation(() => SignInResult)
    async signIn(
        @Ctx() { session, cookies }: Context,
        @Arg('email') email: string,
        @Arg('password') password: string
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
                requiresTOTP: true
            };
        }

        user.signIn(session, cookies);

        return {
            ok: true,
            requiresTOTP: false
        };
    }

    @Authorized()
    @Mutation(() => User)
    async updateAccount(
        @Ctx() { user }: Context,
        @Arg('name', { nullable: true }) name?: string,
        @Arg('email', { nullable: true }) email?: string
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

    @Mutation(() => Result)
    async resetPassword(
        @Ctx() { session, cookies }: Context,
        @Arg('uuid') uuid: string,
        @Arg('password') password: string
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
