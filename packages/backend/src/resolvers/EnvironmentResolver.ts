import { Resolver, InputType, Field, ID, Arg, Ctx, Mutation } from 'type-graphql';
import { Environment } from '../entity/Environment';
import { EnvironmentRepository } from '../repositories/EnvironmentRepository';
import { getCustomRepository } from 'typeorm';
import { OrganizationRepository } from '../repositories/OrganizationRepository';
import { OrganizationPermission } from '../entity/OrganizationMembership';
import { Context } from '../types';

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
    constructor(
        private environmentRepo = getCustomRepository(EnvironmentRepository),
        private organizationRepo = getCustomRepository(OrganizationRepository),
    ) {}

    @Mutation(() => Environment)
    async createEnvironment(@Ctx() { user }: Context, @Arg('input') input: CreateEnvironmentInput) {
        const organization = await this.organizationRepo.findForUser(
            user,
            { id: input.organizationID },
            OrganizationPermission.WRITE,
        );

        return await this.environmentRepo.save(
            Environment.createForOrganization(organization, input.name, input.label),
        );
    }
}
