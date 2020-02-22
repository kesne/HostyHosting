import { QueryResolvers } from '../../schema.graphql';
import { Context } from '../../types';
import { Application } from '../../entity/Application';

const QueryResolvers: QueryResolvers<Context> = {
    me(_parent, _args, { user }) {
        return user;
    },

    async application(_parent, { id }, { user }) {
        const organization = await user.organization;
        const app = await Application.findOne({
            where: {
                id,
                organization,
            }
        });

        if (!app) {
            throw new Error('No application for provided ID was found.');
        }

        return app;
    }
};

export default QueryResolvers;
