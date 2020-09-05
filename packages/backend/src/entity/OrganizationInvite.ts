import { InternalEntity } from './BaseEntity';
import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { OrganizationPermission } from './OrganizationMembership';
import { IsEmail, Length } from 'class-validator';
import { Organization } from './Organization';
import { Lazy } from '../types';

@Entity()
@Unique(['email', 'organization'])
export class OrganizationInvite extends InternalEntity {
    @Column()
    @IsEmail()
    email!: string;

    @Column()
    @Length(1, 50)
    name!: string;

    @Column({ type: 'enum', enum: OrganizationPermission })
    permission!: OrganizationPermission;

    @ManyToOne(
        () => Organization,
        organization => organization.invites,
        { lazy: true },
    )
    organization!: Lazy<Organization>;
}
