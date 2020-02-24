import { QueryResolvers } from '../../schema.graphql';
import { Context } from '../../types';
import { Application } from '../../entity/Application';

const QueryResolvers: QueryResolvers<Context> = {
    me(_parent, _args, { user }) {
        return user;
    },

    async applications(_parent, _args, { organization }) {
        const applications = Application.find({
            where: {
                organization
            }
        });

        return applications;
    },

    async application(_parent, { id }, { organization }) {
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
