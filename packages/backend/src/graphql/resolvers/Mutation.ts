import { authenticator } from 'otplib';
import { MutationResolvers } from '../../schema.graphql';
import { Context } from '../../types';
import { User, AuthType } from '../../entity/User';
import { PasswordReset } from '../../entity/PasswordReset';
import { Organization } from '../../entity/Organization';
import { Application } from '../../entity/Application';

const RESULT_OK = { ok: true };

const MutationResolvers: MutationResolvers<Context> = {
    async signUp(_parent, { name, email, password, organizationName }, { session, cookies }) {
        console.log('CONSTRUCTING ORG');
        const organization = new Organization();
        organization.name = organizationName;
        await organization.save();

        console.log('ORG CONSTRUCTED');

        const user = new User();
        user.name = name;
        user.email = email;
        user.organization = Promise.resolve(organization);

        console.log('USER CONSTRUCTED');

        await user.setPassword(password);

        console.log(`USER PASSWORD SET TO "${password}"`);
        await user.save();
        console.log('user saved');

        user.signIn(session, cookies);

        return RESULT_OK;
    },

    async signIn(_parent, { email, password }, { session, cookies }) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('No user found.');
        }

        const passwordValid = await user.checkPassword(password);

        if (!passwordValid) {
            throw new Error('Invalid password.');
        }

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
    },

    async enableTotp(_parent, { secret, token }, { user }) {
        if (user.totpSecret) {
            throw new Error('User already has TOTP enabled.');
        }

        // TODO: Move to user?
        const isValid = authenticator.verify({ secret, token });
        if (!isValid) {
            throw new Error('Invalid TOTP');
        }
        user.totpSecret = secret;
        await user.save();
        return RESULT_OK;
    },

    async disableTotp(_parent, { password }, { user }) {
        await user.disableTOTP(password);
        return RESULT_OK;
    },

    async exchangeTOTP(_parent, { token }, { session, cookies }) {
        const user = await User.fromTOTPSession(session as any, token);

        if (!user) {
            throw new Error('Failed to get user.');
        }

        user.signIn(session, cookies);

        return RESULT_OK;
    },

    async updateAccount(_parent, { name, email }, { user }) {
        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        return await user.save();
    },

    async forgotPassword(_parent, { email }) {
        await PasswordReset.createForEmail(email);

        return RESULT_OK;
    },

    async resetPassword(_parent, { uuid, password }, { session, cookies }) {
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
            return { complete: true };
        }

        reset.user.signIn(session, cookies, AuthType.PASSWORD_RESET);
        return { complete: false };
    },

    async createApplication(_parent, { name }, { user, organization }) {
        const app = new Application();
        app.name = name;
        app.organization = Promise.resolve(organization);
        app.createdBy = Promise.resolve(user);
        app.secrets = { foo: 'bar' };
        return await app.save();
    }
};

export default MutationResolvers;
