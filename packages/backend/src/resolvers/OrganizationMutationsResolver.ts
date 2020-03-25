import { ObjectType, Arg, Mutation, Int, Ctx, Authorized, Field, Resolver } from 'type-graphql';
import { Context } from '../types';
import { Organization } from '../entity/Organization';
import { Application } from '../entity/Application';
import { OrganizationMembership, OrganizationPermission } from '../entity/OrganizationMembership';
import { OrganizationAccess } from '../utils/permissions';

@ObjectType()
class OrganizationMutations {
    organization: Organization;

    constructor(organization: Organization) {
        this.organization = organization;
    }

    @OrganizationAccess(
        () => OrganizationMutations,
        orgMutations => orgMutations.organization,
        OrganizationPermission.WRITE,
    )
    @Field(() => Application)
    async createApplication(
        @Ctx() { user }: Context,
        @Arg('name') name: string,
        @Arg('description', { nullable: true }) description?: string,
    ) {
        const app = new Application();
        app.name = name;
        app.description = description ?? '';
        app.organization = this.organization;
        app.createdBy = user;
        app.secrets = {};
        return await app.save();
    }
}

@Resolver()
export class OrganizationMutationsResolver {
    @Authorized()
    @Mutation(() => OrganizationMutations)
    async organization(
        @Ctx() { user }: Context,
        @Arg('id', () => Int, {
            nullable: true,
            description:
                'The ID of the organization that you will be performing mutations on. If empty, we will use the signed-in users personal organization.',
        })
        id?: number,
    ) {
        if (!id) {
            const organization = await user.personalOrganization;
            return new OrganizationMutations(organization);
        }

        const membership = await OrganizationMembership.findOneOrFail({
            where: {
                user,
                organization: {
                    id,
                },
            },
            relations: ['organization'],
        });

        return new OrganizationMutations(membership.organization);
    }
}
