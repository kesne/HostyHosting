import { InputType, Field, ID, Mutation, Arg, Resolver } from 'type-graphql';
import { RouterRule } from '../entity/RouterRule';

@InputType()
class CreateRouterRuleInput {
    @Field(() => ID) routerID!: string;
    @Field() domain!: string;
    @Field() pathPrefix!: string;
    @Field() forwardPathPrefix!: boolean;
    @Field(() => ID) componentID!: string;
    @Field(() => ID) environmentID!: string;
}

// @InputType()
// class EditRouterRuleInput {}

// @InputType()
// class DeleteRouterRuleInput {}

@Resolver(() => RouterRule)
export class RouterRuleResolver {
    @Mutation(() => RouterRule)
    createRouterRule(@Arg('input') input: CreateRouterRuleInput) {}

    // @Mutation(() => RouterRule)
    // editRouterRule(@Arg('input') input: EditRouterRuleInput) {}

    // @Mutation(() => RouterRule)
    // deleteRouterRule(@Arg('input') input: DeleteRouterRuleInput) {}
}
