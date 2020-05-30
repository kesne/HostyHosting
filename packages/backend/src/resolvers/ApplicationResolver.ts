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
    Args,
} from 'type-graphql';
import { Application } from '../entity/Application';
import { Context } from '../types';
import { Component } from '../entity/Component';
import { Environment } from '../entity/Environment';
import { OrganizationPermission } from '../entity/OrganizationMembership';
import { Organization } from '../entity/Organization';
import { createConnection, LimitOffsetArgs } from './types/Pagination';

const [ComponentConnection] = createConnection(Component);

@InputType()
class CreateApplicationInput {
    @Field(() => ID)
    organizationID!: string;

    @Field()
    name!: string;

    @Field()
    label!: string;

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
    label?: string;

    @Field({ nullable: true })
    description?: string;
}

@Resolver(() => Application)
export class ApplicationResolver {
    @Authorized()
    @Query(() => Application)
    async application(@Ctx() { user }: Context, @Arg('id', () => ID) id: string) {
        return await Application.findForUserByID(user, id);
    }

    @FieldResolver(() => Component)
    async component(@Root() application: Application, @Arg('id', () => ID) id: string) {
        return await Component.findOneOrFail({
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

    @FieldResolver(() => ComponentConnection)
    async components(@Root() application: Application, @Args() args: LimitOffsetArgs) {
        return await Component.findAndPaginate(
            {
                where: {
                    application,
                },
            },
            args,
        );
    }

    @Mutation(() => Application)
    async createApplication(@Ctx() { user }: Context, @Arg('input') input: CreateApplicationInput) {
        const organization = await Organization.findForUser(
            user,
            { id: input.organizationID },
            OrganizationPermission.WRITE,
        );

        const app = Application.create({
            name: input.name,
            label: input.label,
            description: input.description ?? '',
            organization: organization,
            createdBy: user,
        });

        return await app.save();
    }

    // TODO: This needs to delete all associated resources. (cascasde should solve this)
    @Mutation(() => Application)
    async deleteApplication(@Ctx() { user }: Context, @Arg('input') input: DeleteApplicationInput) {
        const application = await Application.findForUserByID(user, input.applicationID);
        // TODO: Spin down all resources, and instead of immedietly deleting, mark
        // it in a state of deletion, and don't allow modification to the model.
        await Application.delete(application.id);

        return application;
    }

    @Mutation(() => Application)
    async updateApplication(@Ctx() { user }: Context, @Arg('input') input: UpdateApplicationInput) {
        const application = await Application.findForUserByID(user, input.applicationID);
        if (typeof input.name !== 'undefined' && input.name !== null) {
            application.name = input.name;
        }

        if (typeof input.label !== 'undefined' && input.label !== null) {
            application.label = input.label;
        }

        if (typeof input.description !== 'undefined' && input.description !== null) {
            application.description = input.description;
        }

        return await application.save();
    }
}
