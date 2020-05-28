import { Resolver, Query, Arg, Ctx, FieldResolver, Root, Mutation, Int, Args } from 'type-graphql';
import { Organization } from '../entity/Organization';
import { Context } from '../types';
import { Application } from '../entity/Application';
import { OrganizationMembership } from '../entity/OrganizationMembership';
import { createConnection, ConnectionArgs } from './types/Pagination';
import { createNodeResolvable } from './types/Node';

const [ApplicationConnection] = createConnection(Application);

@Resolver(() => Organization)
export class OrganizationResolver extends createNodeResolvable(Organization) {
    @Query(() => Organization)
    async organization(
        @Ctx() { user }: Context,
        @Arg('username', () => String)
        username: string,
    ) {
        return Organization.findForUser(user, { username });
    }

    @Mutation(() => Organization)
    async UNIMPLEMENTED__changeOrganizationUsername() {
        throw new Error('NOT IMPLEMENTED');
        // if (this.organization.isPersonal) {
        //     throw new Error('Personal organization usernames cannot be changed.');
        // }
        // this.organization.username = username;
        // await this.organizationRepo.save(this.organization);
    }

    @FieldResolver(() => ApplicationConnection)
    async applications(@Root() organization: Organization, @Args() args: ConnectionArgs) {
        return Application.findAndPaginate<Application>(
            {
                where: {
                    organization,
                },
            },
            args,
        );
    }

    @FieldResolver(() => Application)
    async application(
        @Ctx() { user }: Context,
        @Root() organization: Organization,
        @Arg('name') name: string,
    ) {
        return await Application.findForUserAndOrganization(user, organization, name);
    }

    @FieldResolver(() => Int)
    async memberCount(@Root() organization: Organization) {
        return await OrganizationMembership.count({
            where: {
                organization,
            },
        });
    }
}
