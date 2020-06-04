import {
    Resolver,
    FieldResolver,
    Int,
    Root,
    Mutation,
    Arg,
    InputType,
    Field,
    ID,
    Args,
} from 'type-graphql';
import { ContainerGroup, ContainerSize } from '../entity/ContainerGroup';
import pricing from '../utils/pricing';
import { Component } from '../entity/Component';
import { Environment } from '../entity/Environment';
import { createConnection, LimitOffsetArgs } from './types/Pagination';
import { Secret } from '../entity/Secret';
import { RouterRule } from '../entity/RouterRule';

const [SecretConnection] = createConnection(Secret);

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

    @FieldResolver(() => SecretConnection)
    async secrets(@Root() containerGroup: ContainerGroup, @Args() args: LimitOffsetArgs) {
        return await Secret.findAndPaginate(
            {
                where: {
                    containerGroup,
                },
            },
            args,
        );
    }

    @FieldResolver(() => [RouterRule])
    async routerRules(@Root() containerGroup: ContainerGroup) {
        return RouterRule.find({
            where: {
                component: await containerGroup.component,
                environment: await containerGroup.environment,
            },
        });
    }

    // TODO: Security pls:
    @Mutation(() => ContainerGroup)
    async createContainerGroup(@Arg('input') input: CreateContainerGroupInput) {
        const component = await Component.findOneOrFail(input.componentID);
        const environment = await Environment.findOneOrFail(input.environmentID);

        const organization = await environment.organization;

        const containerGroup = new ContainerGroup();
        containerGroup.environment = environment;
        containerGroup.organization = organization;
        containerGroup.component = component;
        containerGroup.setSize(input.size);
        containerGroup.setContainerCount(input.containerCount);

        return await containerGroup.save();
    }
}
