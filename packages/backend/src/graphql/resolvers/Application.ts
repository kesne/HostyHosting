import { ApplicationResolvers } from '../../schema.graphql';
import { Context } from '../../types';
import { Application } from '../../entity/Application';

const ApplicationResolvers: ApplicationResolvers<Context> = {
    secrets(parent: Application) {
        if (!parent.secrets) {
            return [];
        }

        return Object.entries(parent.secrets).map(([key, value]) => ({ key, value }));
    }
};

export default ApplicationResolvers;
