import { Resolver, Mutation, InputType, Field, ID, Arg, Ctx, ObjectType } from 'type-graphql';
import { OrganizationMembership, OrganizationPermission } from '../entity/OrganizationMembership';
import { Context } from '../types';

@InputType()
class UpdateOrganizationMembershipInput {
	@Field(() => ID) id!: string;
	@Field(() => OrganizationPermission) permission!: OrganizationPermission;
}

@InputType()
class DeleteOrganizationMembershipInput {
	@Field(() => ID) id!: string;
}

@ObjectType()
class TODORemoveOnceRelayUpdatesToSupportRequiredIDReturns {
	@Field(() => ID, { nullable: true }) id?: string;
}

@Resolver()
export class OrganizationMembershipResolver {
	// TODO: Don't allow removal of the final admin. There always needs to be 1 admin in an organization.
	@Mutation(() => TODORemoveOnceRelayUpdatesToSupportRequiredIDReturns)
	async deleteOrganizationMembership(
		@Arg('input') input: DeleteOrganizationMembershipInput,
        @Ctx() { user }: Context,
	) {
		const membership = await OrganizationMembership.findOneOrFail({
			where: {
				id: input.id
			},
			relations: ['organization']
		});

		await membership.organization.ensureUserHasAccess(user, OrganizationPermission.ADMIN);

		// TODO: Enable actual deletion. Mayyybe send an email letting them know that their permissions were removed.
		// await OrganizationMembership.delete(membership.id);

        return membership;
	}

	// TODO: Don't allow lowering your own permissions.
	// TODO: Also safeguard against 0 admin condition.
    @Mutation(() => OrganizationMembership)
    async updateOrganizationMembership(
        @Arg('input') input: UpdateOrganizationMembershipInput,
        @Ctx() { user }: Context,
    ) {
		const membership = await OrganizationMembership.findOneOrFail({
			where: {
				id: input.id
			},
			relations: ['organization']
		});

		await membership.organization.ensureUserHasAccess(user, OrganizationPermission.ADMIN);

		membership.permission = input.permission;

		return await membership.save();
    }
}
