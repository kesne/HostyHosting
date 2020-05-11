import { getCustomRepository } from 'typeorm';
import { Resolver, Query, Arg, Ctx, FieldResolver, Root } from 'type-graphql';
import { Organization } from '../entity/Organization';
import { Context } from '../types';
import { OrganizationRepository } from '../repositories/OrganizationRepository';
import { ApplicationRepository } from '../repositories/ApplicationRepository';
import { Application } from '../entity/Application';

@Resolver(() => Organization)
export class OrganizationResolver {
    constructor(
        private organizationRepo = getCustomRepository(OrganizationRepository),
        private applicationRepo = getCustomRepository(ApplicationRepository),
    ) {}

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

        return this.organizationRepo.findForUser(user, { username });
    }

    @FieldResolver(() => Application)
    async application(
        @Ctx() { user }: Context,
        @Root() organization: Organization,
        @Arg('name') name: string,
    ) {
        return await this.applicationRepo.findForUserAndOrganization(user, organization, name);
    }
}
