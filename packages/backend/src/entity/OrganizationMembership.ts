import { Entity, ManyToOne, Column, Unique } from 'typeorm';
import { User } from './User';
import { ExternalEntity } from './BaseEntity';
import { Organization } from './Organization';
import { registerEnumType, Field, ObjectType } from 'type-graphql';

// TODO: Should these be integers so that it's easy to tell what we can do?
export enum OrganizationPermission {
    // Allow reading anything but no mutations
    READ = 'READ',
    // Allow any mutations, but do not allow modifications to the organization itself.
    WRITE = 'WRITE',
    // Can do anything inside of an organization:
    ADMIN = 'ADMIN',
}

const ORDERERED_ROLES = [
    OrganizationPermission.READ,
    OrganizationPermission.WRITE,
    OrganizationPermission.ADMIN,
];

export function permissionIsAtLeast(
    desired: OrganizationPermission,
    userPermission: OrganizationPermission,
) {
    return ORDERERED_ROLES.indexOf(userPermission) >= ORDERERED_ROLES.indexOf(desired);
}

registerEnumType(OrganizationPermission, {
    name: 'OrganizationPermission',
});

@ObjectType()
@Entity()
@Unique(['organization', 'user'])
export class OrganizationMembership extends ExternalEntity {
    @Field(() => OrganizationPermission)
    @Column({ type: 'enum', enum: OrganizationPermission, default: OrganizationPermission.READ })
    permission!: OrganizationPermission;

    @ManyToOne(
        () => Organization,
        organization => organization.memberships,
    )
    organization!: Organization;

    @Field(() => User)
    @ManyToOne(
        () => User,
        user => user.organizationMemberships,
    )
    user!: User;
}
