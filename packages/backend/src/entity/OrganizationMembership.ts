import {
    Entity,
    ManyToOne,
    Column,
} from 'typeorm';
import { User } from './User';
import { InternalEntity } from './BaseEntity';
import { Organization } from './Organization';
import { registerEnumType } from 'type-graphql';

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

@Entity()
export class OrganizationMembership extends InternalEntity {
    @Column({ type: 'enum', enum: OrganizationPermission, default: OrganizationPermission.READ })
    permission!: OrganizationPermission;

    @ManyToOne(
        () => Organization,
        organization => organization.memberships,
    )
    organization!: Organization;

    @ManyToOne(
        () => User,
        user => user.organizationMemberships,
    )
    user!: User;
}
