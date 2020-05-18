import {
    Resolver,
    FieldResolver,
    Int,
    Root,
    Arg,
    Query,
    ID,
    Mutation,
    InputType,
    Field,
    Ctx,
} from 'type-graphql';
import { Component, DeploymentStrategy } from '../entity/Component';
import pricing from '../utils/pricing';
import { ContainerGroup } from '../entity/ContainerGroup';
import { Application } from '../entity/Application';
import { Context } from '../types';
import { OrganizationPermission } from '../entity/OrganizationMembership';

@InputType()
class DeleteComponentInput {
    @Field(() => ID)
    componentID!: string;
}

@InputType()
class CreateComponentInput {
    @Field(() => ID)
    applicationID!: string;

    @Field()
    image!: string;

    @Field()
    name!: string;

    @Field(() => DeploymentStrategy)
    deploymentStrategy!: DeploymentStrategy;
}

@InputType()
class UpdateComponentInput {
    @Field(() => ID)
    componentID!: string;

    @Field({ nullable: true })
    image?: string;

    @Field({ nullable: true })
    name?: string;

    @Field(() => DeploymentStrategy, { nullable: true })
    deploymentStrategy?: DeploymentStrategy;
}

@Resolver(() => Component)
export class ComponentResolver {
    @Query(() => Component)
    component(@Arg('id', () => ID) id: string) {
        // TODO: pls pls pls implement auth here:
        return Component.findOneOrFail({ where: { id } });
    }

    @FieldResolver(() => Int)
    async monthlyPrice(@Root() component: Component) {
        const containerGroups = await component.containerGroups;
        return containerGroups.reduce(
            (acc, containerGroup) =>
                acc +
                pricing.calculateMonthlyCost(containerGroup.size, containerGroup.containerCount),
            0,
        );
    }

    @FieldResolver(() => ContainerGroup, { nullable: true })
    async containerGroup(
        @Root() component: Component,
        @Arg('environment', () => ID) environmentID: string,
    ) {
        // TODO: Does this need a guard to make sure the environment is owned by the org?
        return ContainerGroup.findOne({
            where: {
                component,
                environment: {
                    id: environmentID,
                },
            },
        });
    }

    @Mutation(() => Component)
    async deleteComponent(@Arg('input') input: DeleteComponentInput) {
        // TODO: Verify that I can actually do this:
        const component = await Component.findOneOrFail(input.componentID);
        await Component.delete(component.id);
        return component;
    }

    @Mutation(() => Component)
    async createComponent(
        @Ctx() { user }: Context,
        @Arg('input', () => CreateComponentInput) input: CreateComponentInput,
    ) {
        const application = await Application.findForUserByID(
            user,
            input.applicationID,
            OrganizationPermission.WRITE,
        );

        const component = Component.create({
            application,
            name: input.name,
            image: input.image,
            deploymentStrategy: input.deploymentStrategy,
        });

        return await component.save();
    }


    @Field(() => Component)
    async updateComponent(
        @Arg('input') input: UpdateComponentInput,
    ) {
        const component = await Component.findOneOrFail(input.componentID);

        if (typeof input.name !== 'undefined') {
            component.name = input.name;
        }

        if (typeof input.image !== 'undefined') {
            component.image = input.image;
        }

        if (typeof input.deploymentStrategy !== 'undefined') {
            component.deploymentStrategy = input.deploymentStrategy;
        }

        return await component.save();
    }
}
