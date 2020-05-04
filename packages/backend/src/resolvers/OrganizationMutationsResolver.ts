import {
    ObjectType,
    Arg,
    Mutation,
    Int,
    Ctx,
    Authorized,
    Field,
    Resolver,
    ForbiddenError,
} from 'type-graphql';
import { Context } from '../types';
import { Organization } from '../entity/Organization';
import { Application } from '../entity/Application';
import {
    OrganizationMembership,
    OrganizationPermission,
    permissionIsAtLeast,
} from '../entity/OrganizationMembership';
import { ApplicationInput } from './types/ApplicationInput';
import { Environment } from '../entity/Environment';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { OrganizationRepository } from '../repositories/OrganizationRepository';
import { EnvironmentRepository } from '../repositories/EnvironmentRepository';
import { Repository } from 'typeorm';

@ObjectType()
class OrganizationMutations {
    organization: Organization;

    @InjectRepository()
    organizationRepo!: OrganizationRepository;

    @InjectRepository()
    environmentRepo!: EnvironmentRepository;

    @InjectRepository(Application)
    applicationRepo!: Repository<Application>;

    constructor(organization: Organization) {
        this.organization = organization;
    }

    @Field(() => Organization)
    async changeUsername(@Arg('username') username: string) {
        if (this.organization.isPersonal) {
            throw new Error('Personal organization usernames cannot be changed.');
        }
        this.organization.username = username;
        await this.organizationRepo.save(this.organization);
    }

    @Field(() => Environment)
    async createEnvironment(@Arg('name') name: string, @Arg('label') label: string) {
        return await this.environmentRepo.createForOrganization(this.organization, name, label);
    }

    @Field(() => Application)
    async createApplication(
        @Ctx() { user }: Context,
        @Arg('application') applicationInput: ApplicationInput,
    ) {
        if (!applicationInput.name) {
            throw new Error('The application name is required when creating an application.');
        }

        const app = this.applicationRepo.create({
            name: applicationInput.name,
            description: applicationInput.description ?? '',
            organization: this.organization,
            createdBy: user,
        });

        return await this.applicationRepo.save(app);
    }
}

@Resolver()
export class OrganizationMutationsResolver {
    @InjectRepository(OrganizationMembership)
    organizationMembershipRepo!: Repository<OrganizationMembership>;

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

        // TODO: please please generalize this into the repo:
        const membership = await this.organizationMembershipRepo.findOneOrFail({
            where: {
                user,
                organization: {
                    id,
                },
            },
            relations: ['organization'],
        });

        // All mutations to an organization require AT LEAST write access.
        if (!permissionIsAtLeast(OrganizationPermission.WRITE, membership.permission)) {
            throw new ForbiddenError();
        }

        return new OrganizationMutations(membership.organization);
    }
}
