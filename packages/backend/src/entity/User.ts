import { authenticator } from 'otplib';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
    Generated,
} from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { Lazy } from '../types';
import { Organization } from './Organization';
import { ObjectType, Field, Int } from 'type-graphql';
import { IsEmail, Length, Matches } from 'class-validator';
import { BaseEntity } from './BaseEntity';
import { APIKey } from './APIKey';
import { OrganizationMembership } from './OrganizationMembership';
import { NAME_REGEX } from '../constants';
import { removeUserCookie, setUserCookie } from '../utils/cookies';
import { getCurrentRequest } from '../utils/currentRequest';

// NOTE: This was chosed based on a stack overflow post. Probably should do more
// research if you ever deploy this for real.
const SALT_ROUNDS = 10;

export enum AuthType {
    FULL = 'FULL',
    TOTP = 'TOTP',
    PASSWORD_RESET = 'PASSWORD_RESET',
}

export enum GrantType {
    NONE = 'NONE',
    SESSION = 'SESSION',
    API_KEY = 'API_KEY',
}

@Entity()
@ObjectType()
export class User extends BaseEntity {
    /**
     * Denotes how the User entity was authenticated.
     */
    grantType: GrantType = GrantType.NONE;

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    @Generated('uuid')
    uuid!: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    githubID?: string;

    @Field()
    @Column()
    @Length(1, 50)
    name!: string;

    @Field()
    @Column({ unique: true })
    @Length(3, 20)
    @Matches(NAME_REGEX)
    username!: string;

    @Field()
    @Column('citext', { unique: true })
    @IsEmail()
    email!: string;

    @Column({ nullable: true })
    passwordHash!: string;

    @Field(() => String)
    get isPasswordless() {
        return this.githubID && !this.passwordHash;
    }

    // TODO: Need better types here:
    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    async setPassword(newPassword: string) {
        this.passwordHash = await hash(newPassword, SALT_ROUNDS);
    }

    // TODO: Encrypt this somehow.
    @Column('varchar', { nullable: true })
    totpSecret?: string | null;

    @Field()
    get hasTOTP(): boolean {
        return !!this.totpSecret;
    }

    async disableTOTP(password: string) {
        if (!this.totpSecret) {
            return;
        }

        const passwordValid = await compare(password, this.passwordHash);

        if (!passwordValid) {
            throw new Error('Password is not valid!');
        }

        this.totpSecret = null;
    }

    generateTotpSecret() {
        return authenticator.generateSecret();
    }

    async checkPassword(password: string) {
        return await compare(password, this.passwordHash);
    }

    signIn(type: AuthType = AuthType.FULL) {
        const { session } = getCurrentRequest();
        session.userID = this.id;
        session.type = type;
        if (type === AuthType.FULL) {
            setUserCookie(this.id);
        }
    }

    signOut() {
        removeUserCookie();
    }

    // TODO: Eventually, we might want this to be done entirely through the OrganizationMembership,
    // rather than as a field directly. We can still have a virtual field that does the lookup for the
    // personal organization membership, and loads the organization through that, but we could avoid
    // some annoying setting up of relations if we model it this way.
    @Field(() => Organization)
    @OneToOne(() => Organization, { lazy: true })
    @JoinColumn()
    personalOrganization!: Lazy<Organization>;

    @OneToMany(
        () => OrganizationMembership,
        membership => membership.user,
        { lazy: true },
    )
    organizationMemberships!: Lazy<OrganizationMembership[]>;

    @Field(() => [APIKey])
    @OneToMany(
        () => APIKey,
        apiKey => apiKey.user,
        { lazy: true },
    )
    apiKeys!: Lazy<APIKey>;
}
