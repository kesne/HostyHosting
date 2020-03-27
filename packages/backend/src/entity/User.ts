import { authenticator } from 'otplib';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    OneToMany,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { Session, Cookies, Lazy } from '../types';
import { Organization } from './Organization';
import { ObjectType, Field, Int } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { BaseEntity } from './BaseEntity';
import { APIKey } from './APIKey';
import { OrganizationMembership, OrganizationPermission } from './OrganizationMembership';

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
    static async fromAPIKey(apiKey: string): Promise<User | undefined> {
        const key = await APIKey.findOne({
            where: {
                key: apiKey,
            },
            relations: ['user'],
        });

        if (key?.user) {
            key.user.grantType = GrantType.API_KEY;
        }

        return key?.user;
    }

    static async fromSession(
        session: Session,
        allowedType: AuthType = AuthType.FULL,
    ): Promise<User | undefined> {
        if (session.userID && session.type === allowedType) {
            const user = await this.findOne(session.userID);
            if (user) {
                user.grantType = GrantType.SESSION;
            }
            return user;
        }
        return;
    }

    static async fromTOTPSession(session: Session, token: string): Promise<User> {
        if (!session.userID || session.type !== AuthType.TOTP) {
            throw new Error('No TOTP session currently exists.');
        }

        const user = await this.findOne(session.userID);
        if (!user || !user.totpSecret) {
            throw new Error('No user was found in the current session.');
        }

        const isValid = authenticator.verify({ secret: user.totpSecret, token });
        if (!isValid) {
            throw new Error('The TOTP token provided was not valid.');
        }

        return user;
    }

    static async signUp(
        session: Session,
        cookies: Cookies,
        {
            name,
            email,
            password,
            githubID,
        }: { name: string; email: string; password?: string; githubID?: string },
    ) {
        // First create the users' personal organization:
        const organization = new Organization();
        organization.name = 'Personal';
        organization.isPersonal = true;
        await organization.save();

        // Then create the user themself:
        const user = new User();
        user.name = name;
        user.githubID = githubID;
        user.email = email;
        user.personalOrganization = organization;
        // TODO: Do we really want this?
        if (password) {
            await user.setPassword(password);
        }
        await user.save();

        // Finally, add the user into their own organization:
        const membership = new OrganizationMembership();
        membership.user = user;
        membership.organization = organization;
        membership.permission = OrganizationPermission.ADMIN;
        await membership.save();

        user.signIn(session, cookies);
    }

    /**
     * Denotes how the User entity was authenticated.
     */
    grantType: GrantType = GrantType.NONE;

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    githubID?: string;

    @Field()
    @Column()
    @Length(1, 50)
    name!: string;

    @Field()
    @Column('citext', { unique: true })
    @IsEmail()
    email!: string;

    // TODO: Should this actually be nullable? Are github sign-ups password-less?
    @Column({ nullable: true })
    passwordHash!: string;

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

        await this.save();
    }

    generateTotpSecret() {
        return authenticator.generateSecret();
    }

    async checkPassword(password: string) {
        return await compare(password, this.passwordHash);
    }

    signIn(session: Session, cookies: Cookies, type: AuthType = AuthType.FULL) {
        session.userID = this.id;
        session.type = type;
        if (type === AuthType.FULL) {
            cookies.set('hasUser', '1', { httpOnly: false, signed: false });
        }
    }

    // TODO: Could we instead track personal organizaiton via the membership object?
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

    async createAPIKey() {
        const apiKey = new APIKey();
        apiKey.user = this;
        return await apiKey.save();
    }
}
