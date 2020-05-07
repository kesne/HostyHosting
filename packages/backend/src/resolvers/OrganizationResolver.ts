import { getCustomRepository } from 'typeorm';
import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import { Organization } from '../entity/Organization';
import { Context } from '../types';
import { OrganizationRepository } from '../repositories/OrganizationRepository';

@Resolver()
export class OrganizationResolver {
    constructor(private organizationRepo = getCustomRepository(OrganizationRepository)) {}

    @Query(() => Organization)
    async organization(
        @Ctx() { user }: Context,
        @Arg('username', () => String, {
            nullable: true,
            description:
                'The username of the organization to load. If empty, we will use the signed-in users personal organization.',
        })
        username?: string,
    ) {
        if (!username) {
            return await user.personalOrganization;
        }

        return this.organizationRepo.findForUser(user, username);
    }
}
