import { ObjectType, Field, Arg, Mutation, Int, Ctx, Authorized } from 'type-graphql';
import { Application } from '../entity/Application';
import { SecretInput } from './types/Secret';
import { Context } from '../types';
import { Deployment } from '../entity/Deployment';
import { Container } from '../entity/Container';

@ObjectType()
class ApplicationMutations {
    application: Application;

    constructor(application: Application) {
        this.application = application;
    }

    @Field(() => Application)
    async update(
        @Arg('name', { nullable: true }) name?: string,
        @Arg('description', { nullable: true }) description?: string,
        @Arg('secret', { nullable: true }) secret?: SecretInput
    ) {
        if (typeof name !== 'undefined' && name !== null) {
            this.application.name = name;
        }

        if (typeof description !== 'undefined' && description !== null) {
            this.application.description = description;
        }

        if (typeof secret !== 'undefined' && secret !== null) {
            this.application.secrets = {
                ...this.application.secrets,
                [secret.key]: secret.value
            };
        }

        return await this.application.save();
    }

    @Field(() => Deployment)
    async createDeployment(@Arg('image') image: string) {
        const deployment = new Deployment();
        deployment.application = Promise.resolve(this.application);
        deployment.image = image;
        return await deployment.save();
    }

    @Field(() => Deployment)
    async updateDeployment(@Arg('id', () => Int) id: number, @Arg('image') image: string) {
        const deployment = await Deployment.findByApplicationAndId(this.application, id);

        deployment.image = image;

        return await deployment.save();
    }

    @Field(() => Deployment)
    async deleteDeployment(@Arg('id', () => Int) id: number) {
        const deployment = await Deployment.findByApplicationAndId(this.application, id);

        const containers = await deployment.containers;
        if (containers.length) {
            throw new Error('You may only delete deployments with no containers.');
        }

        await Deployment.delete(deployment.id);

        return deployment;
    }

    @Field(() => Container)
    async createContainer(
        @Arg('deployment', () => Int) deploymentID: number,
        @Arg('size', () => Int) size: number,
        @Arg('number', () => Int) number: number
    ) {
        const deployment = await Deployment.findByApplicationAndId(this.application, deploymentID);

        const container = new Container();
        // TODO: Look into a Lazy wrapper that is Promise<T> | T, because I think that technically works
        // and would solve a lot of annoying patterns around constructing these.
        container.application = Promise.resolve(this.application);
        container.size = size;
        container.number = number;
        container.deployment = Promise.resolve(deployment);
        return await container.save();
    }

    @Field(() => Container)
    async updateContainer(
        @Arg('id', () => Int) id: number,
        @Arg('number', () => Int) number: number
    ) {
        const container = await Container.findByApplicationAndId(this.application, id);

        container.number = number;

        return await container.save();
    }

    @Field(() => Container)
    async deleteContainer(@Arg('id', () => Int) id: number) {
        const container = await Container.findByApplicationAndId(this.application, id);

        await Container.delete(container.id);

        return container;
    }
}

export class ApplicationMutationsResolver {
    @Authorized()
    @Mutation(() => ApplicationMutations)
    async application(@Ctx() { organization }: Context, @Arg('id', () => Int) id: number) {
        const application = await Application.findOneOrFail({
            where: {
                id,
                organization
            }
        });

        return new ApplicationMutations(application);
    }
}
