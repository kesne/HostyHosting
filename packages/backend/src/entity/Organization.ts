import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Application } from './Application';
import { ObjectType, Field, Int } from 'type-graphql';
import { Length, Matches } from 'class-validator';
import { BaseEntity } from './BaseEntity';
import { Lazy } from '../types';
import { OrganizationMembership, OrganizationPermission } from './OrganizationMembership';
import { Environment } from './Environment';
import { User } from './User';
import { NAME_REGEX } from '../constants';

@ObjectType()
@Entity()
export class Organization extends BaseEntity {
    static createPersonal(user: User) {
        const organization = new Organization();
        organization.name = 'Personal';
        organization.isPersonal = true;
        organization.username = user.username;

        const membership = new OrganizationMembership();
        membership.user = user;
        membership.organization = organization;
        membership.permission = OrganizationPermission.ADMIN;

        return { organization, membership };
    }

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

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

    @Field()
    @Column()
    @Length(3, 20)
    name!: string;

    @Field()
    @Column({ default: 10 })
    maxComputeUnits!: number;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @OneToMany(
        () => OrganizationMembership,
        membership => membership.organization,
        { lazy: true },
    )
    memberships!: Lazy<OrganizationMembership[]>;

    @Field(() => [Application])
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
        { lazy: true },
    )
    environments!: Lazy<Environment[]>;
}
