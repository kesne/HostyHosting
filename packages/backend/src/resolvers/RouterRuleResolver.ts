import { InputType, Field, ID, Mutation, Arg, Resolver, Ctx } from 'type-graphql';
import { RouterRule } from '../entity/RouterRule';
import { Context } from '../types';
import { Environment } from '../entity/Environment';
import { ContainerGroup } from '../entity/ContainerGroup';
import { Router } from '../entity/Router';

@InputType()
class CreateRouterRuleInput {
    @Field(() => ID) routerID!: string;
    @Field(() => ID) componentID!: string;
    @Field(() => ID) environmentID!: string;
    @Field() domain!: string;
    @Field({ nullable: true }) pathPrefix?: string;
    @Field({ nullable: true }) forwardPathPrefix?: boolean;
}

// @InputType()
// class EditRouterRuleInput {}

// @InputType()
// class DeleteRouterRuleInput {}

@Resolver(() => RouterRule)
export class RouterRuleResolver {
    @Mutation(() => RouterRule)
    async createRouterRule(@Ctx() { user }: Context, @Arg('input') input: CreateRouterRuleInput) {
        const router = await Router.findForUser(user, input.routerID);
        const organization = await router.organization;

        // TODO: Do we need to verify the container group exists, or can you
        // create a rule without it.
        const containerGroup = await ContainerGroup.findOneOrFail({
            where: {
                organization,
                component: { id: input.componentID },
                environment: { id: input.environmentID },
            },
        });

        const rule = RouterRule.create({
            router,
            domain: input.domain,
            pathPrefix: input.pathPrefix,
            forwardPathPrefix: input.forwardPathPrefix,
            component: await containerGroup.component,
            environment: await containerGroup.environment
        });

        return await rule.save();
    }

    // @Mutation(() => RouterRule)
    // editRouterRule(@Arg('input') input: EditRouterRuleInput) {}

    // @Mutation(() => RouterRule)
    // deleteRouterRule(@Arg('input') input: DeleteRouterRuleInput) {}
}
