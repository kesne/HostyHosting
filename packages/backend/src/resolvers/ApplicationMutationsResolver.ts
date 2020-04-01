import { ObjectType, Field, Arg, Mutation, Int, Ctx, Authorized } from 'type-graphql';
import { Application } from '../entity/Application';
import { Deployment } from '../entity/Deployment';
import { ContainerGroup } from '../entity/ContainerGroup';
import { Context } from '../types';
import { OrganizationPermission } from '../entity/OrganizationMembership';
import { OrganizationAccess } from '../utils/permissions';
import { DeploymentInput } from './types/DeploymentInput';
import { ApplicationInput } from './types/ApplicationInput';
import { ContainerGroupInput } from './types/ContainerGroupInput';

@ObjectType()
export class ApplicationMutations {
    application: Application;

    constructor(application: Application) {
        this.application = application;
    }

    // TODO: This needs to delete all associated resources. (cascasde should solve this)
    @OrganizationAccess(
        () => ApplicationMutations,
        applicationMutations => applicationMutations.application.organization,
        OrganizationPermission.WRITE,
    )
    @Field(() => Application)
    async delete() {
        // TODO: Spin down all resources, and instead of immedietly deleting, mark
        // it in a state of deletion, and don't allow modification to the model.
        await Application.delete(this.application.id);

        return this.application;
    }

    @OrganizationAccess(
        () => ApplicationMutations,
        applicationMutations => applicationMutations.application.organization,
        OrganizationPermission.WRITE,
    )
    @Field(() => Application)
    async update(@Arg('application', () => ApplicationInput) applicationInput: ApplicationInput) {
        if (typeof applicationInput.name !== 'undefined' && applicationInput.name !== null) {
            this.application.name = applicationInput.name;
        }

        if (
            typeof applicationInput.description !== 'undefined' &&
            applicationInput.description !== null
        ) {
            this.application.description = applicationInput.description;
        }

        if (typeof applicationInput.secret !== 'undefined' && applicationInput.secret !== null) {
            this.application.secrets = {
                ...this.application.secrets,
                [applicationInput.secret.key]: applicationInput.secret.value,
            };
        }

        return await this.application.save();
    }

    @OrganizationAccess(
        () => ApplicationMutations,
        applicationMutations => applicationMutations.application.organization,
        OrganizationPermission.WRITE,
    )
    @Field(() => Deployment)
    async createDeployment(
        @Arg('deployment', () => DeploymentInput) deploymentInput: DeploymentInput,
    ) {
        const deployment = new Deployment();
        deployment.application = this.application;
        deployment.label = deploymentInput.label;
        deployment.image = deploymentInput.image;
        deployment.strategy = deploymentInput.strategy;
        return await deployment.save();
    }

    @OrganizationAccess(
        () => ApplicationMutations,
        applicationMutations => applicationMutations.application.organization,
        OrganizationPermission.WRITE,
    )
    @Field(() => Deployment)
    // TODO: I'm leaving this as-is for now and not using an input type because this probably needs a lot of work anyway:
    async updateDeployment(@Arg('id', () => Int) id: number, @Arg('image') image: string) {
        const deployment = await Deployment.findByApplicationAndId(this.application, id);

        deployment.image = image;

        return await deployment.save();
    }

    @OrganizationAccess(
        () => ApplicationMutations,
        applicationMutations => applicationMutations.application.organization,
        OrganizationPermission.WRITE,
    )
    @Field(() => Deployment)
    async deleteDeployment(@Arg('id', () => Int) id: number) {
        const deployment = await Deployment.findByApplicationAndId(this.application, id);

        const containerGroups = await deployment.containerGroups;
        if (containerGroups.length) {
            throw new Error('You may only delete deployments with no container groups.');
        }

        await Deployment.delete(deployment.id);

        return deployment;
    }

    @OrganizationAccess(
        () => ApplicationMutations,
        applicationMutations => applicationMutations.application.organization,
        OrganizationPermission.WRITE,
    )
    @Field(() => ContainerGroup)
    async createContainerGroup(
        @Arg('containerGroup', () => ContainerGroupInput) containerGroupInput: ContainerGroupInput,
    ) {
        const deployment = await Deployment.findByApplicationAndId(
            this.application,
            containerGroupInput.deploymentID,
        );

        const containerGroup = new ContainerGroup();
        containerGroup.application = this.application;
        containerGroup.label = containerGroupInput.label;
        containerGroup.size = containerGroupInput.size;
        containerGroup.deployment = deployment;
        containerGroup.containerCount = containerGroupInput.number;

        return await containerGroup.save();
    }

    @OrganizationAccess(
        () => ApplicationMutations,
        applicationMutations => applicationMutations.application.organization,
        OrganizationPermission.WRITE,
    )
    @Field(() => ContainerGroup)
    // TODO: Move to input type.
    async updateContainerGroup(
        @Arg('id', () => Int) id: number,
        @Arg('label', { nullable: true }) label?: string,
        @Arg('number', () => Int, { nullable: true }) number?: number,
    ) {
        const containerGroup = await ContainerGroup.findByApplicationAndId(this.application, id);

        if (label) {
            containerGroup.label = label;
        }

        if (number) {
            containerGroup.containerCount = number;
        }

        return await containerGroup.save();
    }

    @OrganizationAccess(
        () => ApplicationMutations,
        applicationMutations => applicationMutations.application.organization,
        OrganizationPermission.WRITE,
    )
    @Field(() => ContainerGroup)
    async deleteContainerGroup(@Arg('id', () => Int) id: number) {
        const containerGroup = await ContainerGroup.findByApplicationAndId(this.application, id);

        await ContainerGroup.delete(containerGroup.id);

        return containerGroup;
    }
}

export class ApplicationMutationsResolver {
    @Authorized()
    @Mutation(() => ApplicationMutations)
    async application(@Ctx() { user }: Context, @Arg('id', () => Int) id: number) {
        const application = await Application.findOneOrFail({
            where: {
                id,
            },
        });

        // Ensure the current user has permission to this application:
        await application.userHasPermission(user);

        return new ApplicationMutations(application);
    }
}
