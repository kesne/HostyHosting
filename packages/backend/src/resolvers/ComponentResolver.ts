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
} from 'type-graphql';
import { Component } from '../entity/Component';
import * as pricing from '../utils/pricing';
import { ContainerGroup } from '../entity/ContainerGroup';

@InputType()
class DeleteComponentInput {
    @Field(() => ID)
    componentID!: string;
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
                    id: environmentID
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
}
