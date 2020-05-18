import { ObjectType, Field, Arg, Mutation, Ctx, Authorized, Resolver, ID } from 'type-graphql';
import { Application } from '../entity/Application';
import { Component } from '../entity/Component';
import { Context } from '../types';
import { OrganizationPermission } from '../entity/OrganizationMembership';
import { ComponentInput } from './types/ComponentInput';
import { ContainerGroup } from '../entity/ContainerGroup';
import { Environment } from '../entity/Environment';
import { ContainerGroupInput } from './types/ContainerGroupInput';

@ObjectType()
export class ApplicationMutations {
    constructor(private application: Application) {}

    @Field(() => Component)
    async createComponent(@Arg('component', () => ComponentInput) componentInput: ComponentInput) {
        const component = Component.create({
            application: this.application,
            name: componentInput.name,
            image: componentInput.image,
            deploymentStrategy: componentInput.deploymentStrategy,
        });

        return await component.save();
    }

    @Field(() => ContainerGroup)
    async createContainerGroup(
        @Arg('containerGroup', () => ContainerGroupInput) containerGroupInput: ContainerGroupInput,
    ) {
        const organization = await this.application.organization;

        const component = await Component.findOneOrFail({
            where: {
                id: containerGroupInput.componentID,
                application: this.application,
            },
        });

        const environment = await Environment.findOneOrFail({
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

        return await containerGroup.save();
    }

    @Field(() => Component)
    async updateComponent(
        @Arg('id', () => ID) id: string,
        @Arg('component', () => ComponentInput) componentInput: ComponentInput,
    ) {
        const component = await Component.findByApplicationAndId(this.application, id);

        if ('name' in componentInput) {
            component.name = componentInput.name;
        }

        if ('image' in componentInput) {
            component.image = componentInput.image;
        }

        if ('deploymentStrategy' in componentInput) {
            component.deploymentStrategy = componentInput.deploymentStrategy;
        }

        return await component.save();
    }
}

@Resolver()
export class ApplicationMutationsResolver {
    @Authorized()
    @Mutation(() => ApplicationMutations)
    async application(@Ctx() { user }: Context, @Arg('id', () => ID) id: string) {
        const application = await Application.findForUserByID(
            user,
            id,
            // All application mutations require AT LEAST write access to the organization.
            OrganizationPermission.WRITE,
        );

        return new ApplicationMutations(application);
    }
}
