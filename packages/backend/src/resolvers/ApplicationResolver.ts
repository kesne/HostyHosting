import {
    Resolver,
    FieldResolver,
    Root,
    Authorized,
    Query,
    Ctx,
    Arg,
    ID,
    Mutation,
    InputType,
    Field,
} from 'type-graphql';
import { Application } from '../entity/Application';
import { Context } from '../types';
import { Component } from '../entity/Component';
import { Environment } from '../entity/Environment';
import { getCustomRepository, getRepository } from 'typeorm';
import { ApplicationRepository } from '../repositories/ApplicationRepository';
import { OrganizationRepository } from '../repositories/OrganizationRepository';
import { OrganizationPermission } from '../entity/OrganizationMembership';


@InputType()
class CreateApplicationInput {
    @Field(() => ID)
    organizationID!: string;

    @Field()
    name!: string;

    @Field({ nullable: true })
    description?: string;
}

@InputType()
class DeleteApplicationInput {
    @Field(() => ID)
    applicationID!: string;
}

@InputType()
class UpdateApplicationInput {
    @Field(() => ID)
    applicationID!: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;
}

@Resolver(() => Application)
export class ApplicationResolver {
    constructor(
        private applicationRepo = getCustomRepository(ApplicationRepository),
        private componentRepo = getRepository(Component),
        private organizationRepo = getCustomRepository(OrganizationRepository)
    ) {}

    @Authorized()
    @Query(() => Application)
    async application(@Ctx() { user }: Context, @Arg('id', () => ID) id: string) {
        return await this.applicationRepo.findForUserByID(user, id);
    }

    @FieldResolver(() => Component)
    async component(@Root() application: Application, @Arg('id', () => ID) id: string) {
        return await this.componentRepo.findOneOrFail({
            where: {
                id,
                application,
            },
        });
    }

    @FieldResolver(() => [Environment])
    async environments(@Root() application: Application) {
        const organization = await application.organization;
        return organization.environments;
    }

    @Mutation(() => Application)
    async createApplication(
        @Ctx() { user }: Context,
        @Arg('input') input: CreateApplicationInput,
    ) {
        const organization = await this.organizationRepo.findForUser(user, { id: input.organizationID }, OrganizationPermission.WRITE);

        const app = this.applicationRepo.create({
            name: input.name,
            description: input.description ?? '',
            organization: organization,
            createdBy: user,
        });

        return await this.applicationRepo.save(app);
    }

    // TODO: This needs to delete all associated resources. (cascasde should solve this)
    @Mutation(() => Application)
    async deleteApplication(@Ctx() { user }: Context, @Arg('input') input: DeleteApplicationInput) {
        const application = await this.applicationRepo.findForUserByID(user, input.applicationID);
        // TODO: Spin down all resources, and instead of immedietly deleting, mark
        // it in a state of deletion, and don't allow modification to the model.
        await this.applicationRepo.delete(application.id);

        return application;
    }

    @Mutation(() => Application)
    async updateApplication(@Ctx() { user }: Context, @Arg('input') input: UpdateApplicationInput) {
        const application = await this.applicationRepo.findForUserByID(user, input.applicationID);
        if (typeof input.name !== 'undefined' && input.name !== null) {
            application.name = input.name;
        }

        if (typeof input.description !== 'undefined' && input.description !== null) {
            application.description = input.description;
        }

        return await this.applicationRepo.save(application);
    }
}
