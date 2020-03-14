import { ObjectType, Arg, Mutation, Int, Ctx, Authorized, Field, Resolver } from 'type-graphql';
import { Context } from '../types';
import { Organization } from '../entity/Organization';
import { Application } from '../entity/Application';

@ObjectType()
class OrganizationMutations {
    organization: Organization;

    constructor(organization: Organization) {
        this.organization = organization;
    }

    @Field(() => Application)
    async createApplication(
        @Ctx() { user }: Context,
        @Arg('name') name: string,
        @Arg('description', { nullable: true }) description?: string
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
                'The ID of the organization that you will be performing mutations on. If empty, we will use the signed-in users personal organization.'
        })
        id?: number
    ) {
        if (!id) {
            const organization = await user.personalOrganization;
            return new OrganizationMutations(organization);
        }

        // TODO: Use query builder to do this:
        const organization = await Organization.findOneOrFail({
            where: {
                id
            }
        });

        const users = await organization.users;

        if (!users.find(({ id }) => id === user.id)) {
            throw new Error('You do not have access to that organization');
        }

        return new OrganizationMutations(organization);
    }
}
