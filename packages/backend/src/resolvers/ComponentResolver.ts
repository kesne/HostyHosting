import { Resolver, FieldResolver, Int, Root, Arg, Query, ID } from 'type-graphql';
import { Component } from '../entity/Component';
import * as pricing from '../utils/pricing';
import { ContainerGroup } from '../entity/ContainerGroup';
import { getRepository } from 'typeorm';
import { Environment } from '../entity/Environment';

@Resolver(() => Component)
export class ComponentResolver {
    constructor(
        private componentRepo = getRepository(Component),
        private containerGroupRepo = getRepository(ContainerGroup),
        private environmentRepo = getRepository(Environment),
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
    async containerGroup(
        @Root() component: Component,
        @Arg('environment', () => ID) environmentID: string,
    ) {
        // TODO: Does this need a guard to make sure the environment is owned by the org?
        const environment = await this.environmentRepo.findOneOrFail({
            where: {
                id: environmentID,
            },
        });

        return this.containerGroupRepo.findOne({
            where: {
                component,
                environment,
            },
        });
    }
}
