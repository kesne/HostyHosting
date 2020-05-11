import { Resolver, FieldResolver, Int, Root, Arg, Query, ID } from 'type-graphql';
import { Component } from '../entity/Component';
import * as pricing from '../utils/pricing';
import { ContainerGroup } from '../entity/ContainerGroup';
import { getRepository } from 'typeorm';

@Resolver(() => Component)
export class ComponentResolver {
    constructor(
        private componentRepo = getRepository(Component),
        private containerGroupRepo = getRepository(ContainerGroup),
    ) {}

    @Query(() => Component)
    component(@Arg('id', () => ID) id: string) {
        // TODO: pls pls pls implement auth here:
        return this.componentRepo.findOneOrFail({ where: { id } });
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
    containerGroup(
        @Root() component: Component,
        @Arg('environment', () => ID) environmentID: string,
    ) {
        return this.containerGroupRepo.findOne({
            where: {
                component,
                environment: {
                    id: environmentID,
                },
            },
        });
    }
}
