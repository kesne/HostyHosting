import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    Unique,
} from 'typeorm';
import { Organization } from './Organization';
import { User } from './User';
import { Component } from './Component';
import { ObjectType, Field, ForbiddenError } from 'type-graphql';
import { Length, Matches } from 'class-validator';
import { ExternalEntity } from './BaseEntity';
import { Lazy } from '../types';
import { NAME_REGEX } from '../constants';
import { permissionIsAtLeast, OrganizationMembership, OrganizationPermission } from './OrganizationMembership';

@Entity()
@ObjectType()
@Unique(['name', 'organization'])
export class Application extends ExternalEntity {
    static async findForUserByID(user: User, id: string, permission?: OrganizationPermission) {
        const application = await this.findOneOrFail({
            where: { id },
        });

        const membership = await OrganizationMembership.findOneOrFail({
            where: {
                user,
                organization: await application.organization,
            },
        });

        if (permission && !permissionIsAtLeast(permission, membership.permission)) {
            throw new ForbiddenError();
        }

        return application;
    }

    /**
     * Loads an application and verifies that a given user has access
     * to this application. If they do not, it will throw.
     */
    static async findForUserAndOrganization(
        user: User,
        organization: Organization,
        name: string,
        permission?: OrganizationPermission,
    ) {
        const [membership, application] = await Promise.all([
            OrganizationMembership.findOneOrFail({
                where: {
                    user,
                    organization,
                },
            }),
            this.findOneOrFail({
                where: {
                    name,
                    organization,
                },
            }),
        ]);

        if (permission && !permissionIsAtLeast(permission, membership.permission)) {
            throw new ForbiddenError();
        }

        return application;
    }

    @Field()
    @Column()
    @Length(3, 20)
    @Matches(NAME_REGEX)
    name!: string;

    @Field()
    @Column()
    label!: string;

    @Field()
    @Column({ default: '' })
    @Length(0, 250)
    description!: string;

    // TODO: What happens if a user deletes their account:
    @Field(() => User, { nullable: true })
    @ManyToOne(() => User, { lazy: true })
    createdBy!: Lazy<User>;

    @Field(() => Organization)
    @ManyToOne(
        () => Organization,
        organization => organization.applications,
        { lazy: true },
    )
    organization!: Lazy<Organization>;

    @OneToMany(
        () => Component,
        component => component.application,
        { lazy: true },
    )
    components!: Lazy<Component[]>;
}
