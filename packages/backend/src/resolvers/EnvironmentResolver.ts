import { Resolver, InputType, Field, ID, Arg, Ctx, Mutation } from 'type-graphql';
import { Environment } from '../entity/Environment';
import { OrganizationPermission } from '../entity/OrganizationMembership';
import { Context } from '../types';
import { Organization } from '../entity/Organization';

@InputType()
class CreateEnvironmentInput {
    @Field(() => ID)
    organizationID!: string;

    @Field()
    name!: string;

    @Field()
    label!: string;
}

@Resolver(() => Environment)
export class EnvironmentResolver {
    @Mutation(() => Environment)
    async createEnvironment(@Ctx() { user }: Context, @Arg('input') input: CreateEnvironmentInput) {
        const organization = await Organization.findForUser(
            user,
            { id: input.organizationID },
            OrganizationPermission.WRITE,
        );

        return await Environment.save(
            Environment.createForOrganization(organization, input.name, input.label),
        );
    }
}
