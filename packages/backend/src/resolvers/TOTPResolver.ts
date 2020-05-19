import { authenticator } from 'otplib';
import {
    Resolver,
    Ctx,
    Arg,
    Mutation,
    Authorized,
    InputType,
    Field,
    FieldResolver,
} from 'type-graphql';
import Result from './types/Result';
import { GrantType, User } from '../entity/User';
import { Context } from '../types';
import { CurrentUserOnly } from '../utils/permissions';

@InputType()
class EnableTOTPInput {
    @Field()
    secret!: string;
    @Field()
    token!: string;
}

@InputType()
class DisableTOTPInput {
    @Field()
    password!: string;
}

@Resolver(() => User)
export class TOTPResolver {
    // NOTE: This is intentionally unauthorized because we don't yet have a full
    // user session that can be resolved.
    @Mutation(() => Result)
    async exchangeTOTP(@Arg('token') token: string) {
        const user = await User.fromTOTPSession(token);
        await user.signIn();
        return new Result();
    }

    // TODO: This seems weird to have on every user, can we move it?
    @CurrentUserOnly()
    @Authorized(GrantType.SESSION)
    @FieldResolver()
    onboardTOTP(@Ctx() { user }: Context): string {
        if (user.totpSecret) {
            throw new Error('TOTP Already Enabled');
        }

        // TODO: Move this outside of the user model, it doesn't really make sense
        // to be there. We can make a util file that does TOTP stuff.
        return user.generateTotpSecret();
    }

    @Authorized(GrantType.SESSION)
    @Mutation(() => User)
    async enableTOTP(@Ctx() { user }: Context, @Arg('input') input: EnableTOTPInput) {
        if (user.totpSecret) {
            throw new Error('User already has TOTP enabled.');
        }

        // TODO: Move to user?
        const isValid = authenticator.verify({ secret: input.secret, token: input.token });
        if (!isValid) {
            throw new Error('Invalid TOTP');
        }
        user.totpSecret = input.secret;
        return await user.save();
    }

    @Authorized(GrantType.SESSION)
    @Mutation(() => User)
    async disableTOTP(@Ctx() { user }: Context, @Arg('input') input: DisableTOTPInput) {
        await user.disableTOTP(input.password);
        return await user.save();
    }
}
