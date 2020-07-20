import { Resolver, Query, Arg, Ctx, FieldResolver, Root, Int, Args, Field } from 'type-graphql';
import { Organization } from '../entity/Organization';
import { Context } from '../types';
import { Application } from '../entity/Application';
import { OrganizationMembership } from '../entity/OrganizationMembership';
import { createConnection, ConnectionArgs, LimitOffsetArgs } from './types/Pagination';
import { Like } from 'typeorm';

const [ApplicationConnection] = createConnection(Application);
const [OrganizationMembershipConnection] = createConnection(OrganizationMembership);

@Resolver(() => Organization)
export class OrganizationResolver {
    @Query(() => Organization)
    async organization(
        @Ctx() { user }: Context,
        @Arg('username', () => String)
        username: string,
    ) {
        return Organization.findForUser(user, { username });
    }

    @FieldResolver(() => ApplicationConnection)
    async applications(@Root() organization: Organization, @Args() args: LimitOffsetArgs) {
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

    @FieldResolver(() => OrganizationMembershipConnection)
    async members(@Root() organization: Organization, @Args() args: LimitOffsetArgs) {
        return await OrganizationMembership.findAndPaginate<Application>(
            {
                relations: ['user'],
                where: {
                    organization,
                },
            },
            args,
        );
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
