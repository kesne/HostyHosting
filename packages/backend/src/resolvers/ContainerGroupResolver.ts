import { Resolver, FieldResolver, Int, Root, Mutation, Arg, InputType, Field, ID } from 'type-graphql';
import { ContainerGroup, ContainerSize } from '../entity/ContainerGroup';
import pricing from '../utils/pricing';
import { Component } from '../entity/Component';
import { Environment } from '../entity/Environment';

@InputType()
export class CreateContainerGroupInput {
    @Field(() => ID)
    componentID!: string;

    @Field(() => ID)
    environmentID!: string;

    @Field(() => ContainerSize)
    size!: ContainerSize;

    @Field(() => Int)
    containerCount!: number;
}


@Resolver(() => ContainerGroup)
export class ContainerGroupResolver {
    @FieldResolver(() => Int)
    async monthlyPrice(@Root() containerGroup: ContainerGroup) {
        return pricing.calculateMonthlyCost(containerGroup.size, containerGroup.containerCount);
    }

    // TODO: Security pls:
    @Mutation(() => ContainerGroup)
    async createContainerGroup(
        @Arg('input') input: CreateContainerGroupInput,
    ) {
        const component = await Component.findOneOrFail(input.componentID);
        const environment = await Environment.findOneOrFail(input.environmentID);

        const organization = await environment.organization

        const containerGroup = new ContainerGroup();
        containerGroup.environment = environment;
        containerGroup.organization = organization;
        containerGroup.component = component;
        containerGroup.setSize(input.size);
        containerGroup.setContainerCount(input.containerCount);

        return await containerGroup.save();
    }
}
