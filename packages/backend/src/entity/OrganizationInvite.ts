import { InternalEntity, ExternalEntity } from './BaseEntity';
import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { OrganizationPermission } from './OrganizationMembership';
import { IsEmail, Length } from 'class-validator';
import { Organization } from './Organization';
import { Lazy } from '../types';
import { User } from './User';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
@Unique(['email', 'organization'])
export class OrganizationInvite extends ExternalEntity {
    static async accept(id: string, currentUser: User) {
        const invite = await this.findOneOrFail(id);
        if (invite.email !== currentUser.email) {
            throw new Error('You cannot accept another users invite.');
        }
        const organization = await invite.organization;
        await organization.addUserToOrganization(currentUser, invite.permission);
        await this.delete(invite.id);
        return invite;
    }

    @Column()
    @IsEmail()
    @Field()
    email!: string;

    @Column()
    @Length(1, 50)
    @Field()
    name!: string;

    @Field(() => OrganizationPermission)
    @Column({ type: 'enum', enum: OrganizationPermission })
    permission!: OrganizationPermission;

    @ManyToOne(
        () => Organization,
        organization => organization.invites,
        { lazy: true },
    )
    organization!: Lazy<Organization>;
}
