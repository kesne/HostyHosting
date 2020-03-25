import { Resolver, Query, Int, Arg, Ctx } from 'type-graphql';
import { Organization } from '../entity/Organization';
import { Context } from '../types';
import { OrganizationMembership } from '../entity/OrganizationMembership';

@Resolver()
export class OrganizationResolver {
    @Query(() => Organization)
    async organization(
        @Ctx() { user }: Context,
        @Arg('id', () => Int, {
            nullable: true,
            description:
                'The ID of the organization to load. If empty, we will use the signed-in users personal organization.',
        })
        id?: number,
    ) {
        if (!id) {
            return await user.personalOrganization;
        }

        const membership = await OrganizationMembership.findOneOrFail({
            where: {
                user: user,
                organization: { id: id },
            },
            relations: ['organization'],
        });

        return membership.organization;
    }
}
