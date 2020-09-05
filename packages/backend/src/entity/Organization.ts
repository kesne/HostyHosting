import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { Application } from './Application';
import { ObjectType, Field, ForbiddenError, registerEnumType } from 'type-graphql';
import { Length, Matches } from 'class-validator';
import { ExternalEntity } from './BaseEntity';
import { Lazy } from '../types';
import {
    OrganizationMembership,
    OrganizationPermission,
    permissionIsAtLeast,
} from './OrganizationMembership';
import { Environment } from './Environment';
import { User } from './User';
import { NAME_REGEX } from '../constants';
import { Router } from './Router';
import { OrganizationInvite } from './OrganizationInvite';

@ObjectType()
@Entity()
export class Organization extends ExternalEntity {
    static async findForUser(
        user: User,
        condition: { id: string } | { username: string },
        permission?: OrganizationPermission,
    ) {
        const where = 'id' in condition ? { id: condition.id } : { username: condition.username };
        const organization = await this.findOneOrFail({ where });

        organization.ensureUserHasAccess(user, permission);

        return organization;
    }

    static createPersonal(user: User) {
        const organization = new Organization();
        organization.name = 'Personal';
        organization.isPersonal = true;
        organization.username = user.username;

        const membership = new OrganizationMembership();
        membership.user = user;
        membership.organization = organization;
        membership.permission = OrganizationPermission.ADMIN;

        const router = new Router();
        router.organization = organization;
        router.label = 'Default';

        organization.memberships = [membership];
        organization.environments = Environment.createDefaultEnvironments(organization);
        organization.router = router;

        return organization;
    }

    /**
     * Denotes if a organization is a "Personal" organization.
     */
    @Field()
    @Column({ default: false })
    isPersonal!: boolean;

    @Field()
    @Column('citext', { unique: true })
    @Length(3, 20)
    @Matches(NAME_REGEX)
    username!: string;

    // TODO: Rename this because it's _HELLA_ confusing that name on org means "label",
    // and name everywhere else means "DNS Name"
    @Field()
    @Column()
    @Length(3, 20)
    name!: string;

    @Field()
    @Column({ default: 10 })
    maxComputeUnits!: number;

    @OneToMany(
        () => OrganizationMembership,
        membership => membership.organization,
        { lazy: true, cascade: true },
    )
    memberships!: Lazy<OrganizationMembership[]>;

    @OneToMany(
        () => Application,
        application => application.organization,
        { lazy: true },
    )
    applications!: Lazy<Application[]>;

    @Field(() => [Environment])
    @OneToMany(
        () => Environment,
        environment => environment.organization,
        { lazy: true, cascade: true },
    )
    environments!: Lazy<Environment[]>;

    @OneToMany(
        () => OrganizationInvite,
        invite => invite.organization,
        { lazy: true },
    )
    invites!: Lazy<OrganizationInvite[]>;

    @Field(() => Router)
    @OneToOne(
        () => Router,
        router => router.organization,
        { lazy: true, cascade: true },
    )
    router!: Lazy<Router>;

    async ensureUserHasAccess(user: User, permission?: OrganizationPermission) {
        const membership = await OrganizationMembership.findOneOrFail({
            where: {
                user: user,
                organization: this,
            },
        });

        if (permission && !permissionIsAtLeast(permission, membership.permission)) {
            throw new ForbiddenError();
        }
    }

    async addUserToOrganization(user: User, permission: OrganizationPermission) {
        const membership = OrganizationMembership.create({
            // TODO: I need to figure out why I need to expand these entites like this, but if I don't, it fails.
            user: {
                id: user.id,
            },
            organization: {
                id: this.id,
            },
            permission,
        });

        return membership.save();
    }
}
