import { InputType, Field, ID, Mutation, Arg, Resolver, Ctx } from 'type-graphql';
import { RouterRule } from '../entity/RouterRule';
import { Context } from '../types';
import { ContainerGroup } from '../entity/ContainerGroup';

@InputType()
class CreateRouterRuleInput {
    @Field(() => ID) containerGroupID!: string;
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
        const containerGroup = await ContainerGroup.findForUser(user, input.containerGroupID);
        const organization = await containerGroup.organization;

        const rule = RouterRule.create({
            containerGroup,
            router: await organization.router,
            domain: input.domain,
            pathPrefix: input.pathPrefix,
            forwardPathPrefix: input.forwardPathPrefix,
        });

        return await rule.save();
    }

    // @Mutation(() => RouterRule)
    // editRouterRule(@Arg('input') input: EditRouterRuleInput) {}

    // @Mutation(() => RouterRule)
    // deleteRouterRule(@Arg('input') input: DeleteRouterRuleInput) {}
}
