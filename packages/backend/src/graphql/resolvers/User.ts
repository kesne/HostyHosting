import { UserResolvers } from '../../schema.graphql';
import { Context } from '../../types';

const UserResolvers: UserResolvers<Context> = {
    async onboardTOTP(_parent, _args, { user }) {
        if (user.totpSecret) {
            throw new Error('TOTP Already Enabled');
        }

        return {
            secret: user.generateTotpSecret()
        };
    }
};

export default UserResolvers;
