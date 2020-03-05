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

    async createContainer(
        { __application: application },
        { deployment: deploymentID, size, number }
    ) {
        const deployment = await Deployment.findOneOrFail({
            where: {
                id: deploymentID,
                application
            }
        });

        const container = new Container();
        container.application = Promise.resolve(application);
        container.size = size;
        container.number = number;
        container.deployment = Promise.resolve(deployment);
        return await container.save();
    },

    async updateContainer({ __application: application }, { id, number }) {
        const container = await Container.findOneOrFail({
            where: {
                id,
                application
            }
        });

        container.number = number;

        return await container.save();
    },

    async deleteContainer({ __application: application }, { id }) {
        const container = await Container.findOneOrFail({
            where: {
                id,
                application
            }
        });

        await Container.delete(container.id);

        return container;
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
                application
            }
        });

        deployment.image = image;

        return await deployment.save();
    },

    async deleteDeployment({ __application: application }, { id }) {
        const deployment = await Deployment.findOneOrFail({
            where: {
                id,
                application
            },
            relations: ['containers']
        });

        const containers = await deployment.containers;
        if (containers.length) {
            throw new Error('You may only delete deployments with no containers.');
        }

        await Deployment.delete(deployment.id);

        return deployment;
    }
};

export default ApplicationMutationsResolvers;
