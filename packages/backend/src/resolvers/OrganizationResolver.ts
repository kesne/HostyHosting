import { Resolver, Query, Int, Arg, Ctx } from 'type-graphql';
import { Organization } from '../entity/Organization';
import { Context } from '../types';

@Resolver()
export class OrganizationResolver {
    @Query(() => Organization)
    async organization(@Ctx() { user }: Context, @Arg('id', () => Int, {
        nullable: true,
        description:
            'The ID of the organization to load. If empty, we will use the signed-in users personal organization.'
    }) id?: number) {
        if (!id) {
            return await user.personalOrganization;
        }

        // TODO: This is bad and we need a better query to determine if users are included or not.
        const organization = await Organization.findOneOrFail({
            where: {
                id
            }
        });

        const users = await organization.users;
        if (!users.find(({ id }) => id === user.id)) {
            throw new Error('No access.');
        }

        return organization;
    }
}
