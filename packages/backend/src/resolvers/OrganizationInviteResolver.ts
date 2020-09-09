import {
    Query,
    Arg,
    Resolver,
    ObjectType,
    Field,
    ID,
    Mutation,
    Authorized,
    Ctx,
    InputType,
} from 'type-graphql';
import { OrganizationInvite } from '../entity/OrganizationInvite';
import { OrganizationPermission, OrganizationMembership } from '../entity/OrganizationMembership';
import { Organization } from '../entity/Organization';
import { Context } from '../types';
import Result from './types/Result';
import { User } from '../entity/User';

@ObjectType()
class OrganizationInvitePreview {
    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field(() => OrganizationPermission)
    permission!: OrganizationPermission;

    @Field()
    organizationName!: string;
}

@InputType()
class InviteToOrganizationInput {
    @Field(() => ID) organizationID!: string;
    @Field() name!: string;
    @Field() email!: string;
    @Field(() => OrganizationPermission) permission!: OrganizationPermission;
}

@Resolver()
export class OrganizationInviteResolver {
    @Mutation(() => Result)
    async inviteToOrganization(
        @Arg('input') input: InviteToOrganizationInput,
        @Ctx() { user }: Context,
    ) {
        const organization = await Organization.findForUser(
            user,
            { id: input.organizationID },
            OrganizationPermission.ADMIN,
        );

        const userToInvite = await User.findOne({
            where: {
                email: input.email,
            },
        });

        if (userToInvite) {
            const existingMembership = await OrganizationMembership.findOne({
                where: {
                    organization,
                    user: userToInvite,
                },
            });

            if (existingMembership) {
                throw new Error('This user is already in the organization.');
            }
        }

        const invite = OrganizationInvite.create({
            organization,
            email: input.email,
            name: input.name,
            permission: input.permission,
        });

        // TODO: Snail mail the user telling them to join the organization.
        await invite.save();

        console.log(invite);

        return new Result();
    }

    @Query(() => OrganizationInvitePreview)
    async organizationInvitePreview(@Arg('id', () => ID) id: string) {
        const invite = await OrganizationInvite.findOneOrFail(id);
        const preview = new OrganizationInvitePreview();

        Object.assign(preview, {
            name: invite.name,
            email: invite.email,
            permission: invite.permission,
            organizationName: (await invite.organization).name,
        });

        return preview;
    }

    @Authorized()
    @Mutation(() => Organization)
    async acceptInvite(@Arg('id', () => ID) id: string, @Ctx() { user }: Context) {
        const invite = await OrganizationInvite.accept(id, user);
        return invite.organization;
    }
}
