import { ObjectType, Field, Arg, Mutation, Int, Ctx, Authorized, Resolver, ID } from 'type-graphql';
import { Application } from '../entity/Application';
import { Component } from '../entity/Component';
import { Context } from '../types';
import { OrganizationPermission } from '../entity/OrganizationMembership';
import { ComponentInput } from './types/ComponentInput';
import { ApplicationInput } from './types/ApplicationInput';
import { ContainerGroup } from '../entity/ContainerGroup';
import { Environment } from '../entity/Environment';
import { Secret } from '../entity/Secret';
import { ContainerGroupInput } from './types/ContainerGroupInput';
import { getCustomRepository, getRepository } from 'typeorm';
import { ComponentRepository } from '../repositories/ComponentRepository';
import { ApplicationRepository } from '../repositories/ApplicationRepository';

@ObjectType()
export class ApplicationMutations {
    constructor(
        private application: Application,
        private applicationRepo = getRepository(Application),
        private componentRepo = getCustomRepository(ComponentRepository),
        private environmentRepo = getRepository(Environment),
        private containerGroupRepo = getRepository(ContainerGroup),
        private secretRepo = getRepository(Secret),
    ) {}

    // TODO: This needs to delete all associated resources. (cascasde should solve this)
    @Field(() => Application)
    async delete() {
        // TODO: Spin down all resources, and instead of immedietly deleting, mark
        // it in a state of deletion, and don't allow modification to the model.
        await this.applicationRepo.delete(this.application.id);

        return this.application;
    }

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

        return await this.applicationRepo.save(this.application);
    }

    @Field(() => Component)
    async createComponent(@Arg('component', () => ComponentInput) componentInput: ComponentInput) {
        const component = this.componentRepo.create({
            application: this.application,
            name: componentInput.name,
            image: componentInput.image,
            deploymentStrategy: componentInput.deploymentStrategy,
        });

        return await this.componentRepo.save(component);
    }

    @Field(() => ContainerGroup)
    async createContainerGroup(
        @Arg('containerGroup', () => ContainerGroupInput) containerGroupInput: ContainerGroupInput,
    ) {
        const organization = await this.application.organization;

        const component = await this.componentRepo.findOneOrFail({
            where: {
                id: containerGroupInput.componentID,
                application: this.application,
            },
        });

        const environment = await this.environmentRepo.findOneOrFail({
            where: {
                id: containerGroupInput.environmentID,
                organization,
            },
        });

        const containerGroup = new ContainerGroup();
        containerGroup.environment = environment;
        containerGroup.organization = organization;
        containerGroup.component = component;
        containerGroup.setSize(containerGroupInput.size);
        containerGroup.setContainerCount(containerGroupInput.containerCount);

        return await this.containerGroupRepo.save(containerGroup);
    }

    @Field(() => Component)
    async updateComponent(
        @Arg('id', () => ID) id: string,
        @Arg('component', () => ComponentInput) componentInput: ComponentInput,
    ) {
        const component = await this.componentRepo.findByApplicationAndId(this.application, id);

        if ('name' in componentInput) {
            component.name = componentInput.name;
        }

        if ('image' in componentInput) {
            component.image = componentInput.image;
        }

        if ('deploymentStrategy' in componentInput) {
            component.deploymentStrategy = componentInput.deploymentStrategy;
        }

        return await this.componentRepo.save(component);
    }

    @Field(() => Secret)
    async addSecret(
        @Arg('containerGroup', () => ID) containerGroupID: string,
        @Arg('key') key: string,
        @Arg('value') value: string,
    ) {
        // TODO: This is not really secure because we don't scope the container group lookup.
        // Instead, at some point in the future we need to move all of the containerGroup mutations into a ContainerGroupMutationsResolver.
        const containerGroup = await this.containerGroupRepo.findOneOrFail({
            where: {
                id: containerGroupID,
            },
        });

        const secret = this.secretRepo.create({
            key,
            value,
            containerGroup,
        });

        return await this.secretRepo.save(secret);
    }

    @Field(() => Secret)
    async editSecret(
        @Arg('containerGroup', () => ID) containerGroupID: string,
        @Arg('id', () => ID) id: string,
        @Arg('key') key: string,
        @Arg('value') value: string,
    ) {
        const containerGroup = await this.containerGroupRepo.findOneOrFail({
            where: {
                id: containerGroupID,
            },
        });

        const secret = await this.secretRepo.findOneOrFail({
            where: {
                id,
                containerGroup,
            },
        });

        secret.key = key;
        secret.value = value;

        return await this.secretRepo.save(secret);
    }

    @Field(() => Secret)
    async deleteSecret(
        @Arg('containerGroup', () => ID) containerGroupID: string,
        @Arg('id', () => ID) id: string,
    ) {
        const containerGroup = await this.containerGroupRepo.findOneOrFail({
            where: {
                id: containerGroupID,
            },
        });

        const secret = await this.secretRepo.findOneOrFail({
            where: {
                id,
                containerGroup,
            },
        });

        await this.secretRepo.delete(secret.id);

        return secret;
    }

    @Field(() => Component)
    async deleteComponent(@Arg('id', () => ID) id: string) {
        const component = await this.componentRepo.findByApplicationAndId(this.application, id);
        await this.componentRepo.delete(component.id);
        return component;
    }
}

@Resolver()
export class ApplicationMutationsResolver {
    constructor(private applicationRepo = getCustomRepository(ApplicationRepository)) {}

    @Authorized()
    @Mutation(() => ApplicationMutations)
    async application(@Ctx() { user }: Context, @Arg('id', () => ID) id: string) {
        const application = await this.applicationRepo.findForUserByID(
            user,
            id,
            // All application mutations require AT LEAST write access to the organization.
            OrganizationPermission.WRITE,
        );

        return new ApplicationMutations(application);
    }
}
