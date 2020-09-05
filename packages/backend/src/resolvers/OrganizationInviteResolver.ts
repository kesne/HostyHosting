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
} from 'type-graphql';
import { OrganizationInvite } from '../entity/OrganizationInvite';
import { OrganizationPermission } from '../entity/OrganizationMembership';
import { Organization } from '../entity/Organization';
import { Context } from '../types';

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

// TODO: If the email address of the current user does not match the email of the invite,
// then we should error out.

@Resolver()
export class OrganizationInviteResolver {
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
        const invite = await OrganizationInvite.findOneOrFail(id);
        const organization = await invite.organization;
        await organization.addUserToOrganization(user, invite.permission);
        await OrganizationInvite.delete(invite.id);
        return organization;
    }
}
