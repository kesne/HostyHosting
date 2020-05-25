import { Resolver, Query, Arg, ID, Mutation, InputType, Field, Ctx } from 'type-graphql';
import { Router } from '../entity/Router';
import { Organization } from '../entity/Organization';
import { Context } from '../types';
import { OrganizationPermission } from '../entity/OrganizationMembership';

@InputType()
class CreateRouterInput {
    @Field(() => ID) organizationID!: string;
    @Field() label!: string;
}

@InputType()
class DeleteRouterInput {
    @Field(() => ID) routerID!: string;
}

@Resolver(() => Router)
export class RouterResolver {
    @Query(() => Router)
    router(@Arg('id', () => ID) id: string) {
        return Router.findOneOrFail({
            where: { id },
        });
    }

    @Mutation(() => Router)
    async createRouter(@Ctx() { user }: Context, @Arg('input') input: CreateRouterInput) {
        const organization = await Organization.findForUser(
            user,
            { id: input.organizationID },
            OrganizationPermission.WRITE,
        );

        const router = Router.create({
            organization,
            label: input.label,
        });

        return await router.save();
    }

    @Mutation(() => Router)
    deleteRouter(@Arg('input') input: DeleteRouterInput) {
		throw new Error('TODO: Implement this.');
	}
}
