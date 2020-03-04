import { ApplicationMutationsResolvers } from '../../schema.graphql';
import { Application } from '../../entity/Application';
import { Context } from '../../types';
import { Container } from '../../entity/Container';
import { Deployment } from '../../entity/Deployment';

type Parent = {
    __application: Application;
};

const ApplicationMutationsResolvers: ApplicationMutationsResolvers<Context, Parent> = {
    async update({ __application: application }, { name, description, secret }) {
        if (typeof name !== 'undefined' && name !== null) {
            application.name = name;
        }

        if (typeof description !== 'undefined' && description !== null) {
            application.description = description;
        }

        if (typeof secret !== 'undefined' && secret !== null) {
            application.secrets = {
                ...application.secrets,
                [secret.key]: secret.value
            };
        }

        return await application.save();
    },

    async createContainer({ __application: application }, { size, number }) {
        const container = new Container();
        container.application = Promise.resolve(application);
        container.size = size;
        container.number = number;
        return await container.save();
    },

    async updateContainer({ __application: application }, { id, number }) {
        const container = await Container.findOneOrFail({
            where: {
                id,
                application,
            }
        });

        container.number = number;

        return await container.save();
    },

    async createDeployment({ __application: application }, { image }) {
        const deployment = new Deployment();
        deployment.application = Promise.resolve(application);
        deployment.image = image;
        return await deployment.save();
    },

    async updateDeployment({ __application: application }, { id, image }) {
        const deployment = await Deployment.findOneOrFail({
            where: {
                id,
                application,
            }
        });

        deployment.image = image;

        return await deployment.save();
    },
};

export default ApplicationMutationsResolvers;
