import { Entity, Column, OneToMany } from 'typeorm';
import { Application } from './Application';
import { ObjectType, Field, ForbiddenError } from 'type-graphql';
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

        const membership = await OrganizationMembership.findOneOrFail({
            where: {
                user: user,
                organization: organization,
            },
        });

        if (permission && !permissionIsAtLeast(permission, membership.permission)) {
            throw new ForbiddenError();
        }

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

        organization.memberships = [membership];
        organization.environments = Environment.createDefaultEnvironments(organization);

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
    // u wot m8
    // 13 years ?? ++ ----
    // Jordan
    // VapeJuice = troll name
    // Trashy online
    // Breakfast is the cats name
    // Cat cam is entirely my idea and any other stream stole it
    // people are mean to me
    // The internet is mean
    // I vape OFF STREAM
    // Everyone steals my ideas (Cat Cam, Brexit)
    // I don't listen to music when I work
    // Noises hurt my ears
    // 26 years old
    // I've been told I look young
    // I don't use Python (I think it's bad)
    // Redux is bad
    // Mashafique is great
    // Jordan
    // You s2 only on Netflix
    // HandpansLive is amazing
    // Just because you're my age (or older, or younger) and not where I'm at
    //    doesn't make you a failure
    // Success !== your salary
    // Your path to success will be different than mine
    // People > Profits
    // Focus on yourself, not your fucking stupid-ass carreer
    // Personal growth always trumps profesional groth.
    // VS Code is the best thing ever
    // Apex Legends (Valorant)
    // Blue
    // Do you every wake up in the morning,
    //    and just stare at the ceiling and think "Fuck man...... Fuck."?
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

    @Field(() => [Router])
    @OneToMany(
        () => Router,
        router => router.organization,
        { lazy: true, cascade: true },
    )
    routers!: Lazy<Router[]>;
}
