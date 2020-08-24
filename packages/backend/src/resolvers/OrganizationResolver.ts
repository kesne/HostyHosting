import {
    Resolver,
    Query,
    Arg,
    Ctx,
    FieldResolver,
    Root,
    Int,
    Args,
    Field,
    Mutation,
    InputType,
    ID,
} from 'type-graphql';
import { Organization } from '../entity/Organization';
import { Context } from '../types';
import { Application } from '../entity/Application';
import { OrganizationMembership, OrganizationPermission } from '../entity/OrganizationMembership';
import { createConnection, LimitOffsetArgs } from './types/Pagination';
import { resolve } from 'path';
import { OrganizationAccess } from '../utils/permissions';

const [ApplicationConnection] = createConnection(Application);
const [OrganizationMembershipConnection] = createConnection(OrganizationMembership);

@InputType()
class InviteToOrganizationInput {
    @Field(() => ID) organizationID!: string;
    @Field() name!: string;
    @Field() email!: string;
    @Field(() => OrganizationPermission) permission!: OrganizationPermission;
}

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

    @Mutation(() => OrganizationMembership)
    async inviteToOrganization(
        @Arg('input') input: InviteToOrganizationInput,
        @Ctx() { user }: Context,
    ) {
        const organization = await Organization.findForUser(
            user,
            { id: input.organizationID },
            OrganizationPermission.ADMIN,
        );

        // 1. See if the user exists.
        // 2a. If user exists, create invite record, and send an email.
        // 2b. If user does not exist, create invite record (not bound to user), send an email (the flow here is signup -> auto-accept the invite).
        // 3. Add route to accept the invite.

        console.log({ input });

        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    id: 'TODO',
                });
            }, 2000);
        });
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

    @FieldResolver(() => OrganizationMembership)
    membership(@Root() organization: Organization, @Ctx() { user }: Context) {
        return OrganizationMembership.findOne({
            where: {
                organization,
                user,
            },
        });
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
