import { authenticator } from 'otplib';
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { Lazy } from '../types';
import { Organization } from './Organization';
import { ObjectType, Field, Int } from 'type-graphql';
import { IsEmail, Length, Matches } from 'class-validator';
import { ExternalEntity } from './BaseEntity';
import { APIKey } from './APIKey';
import { OrganizationMembership } from './OrganizationMembership';
import { NAME_REGEX } from '../constants';
import { removeUserCookie, setUserCookie } from '../utils/cookies';
import { getCurrentRequest } from '../utils/currentRequest';
import { Environment } from './Environment';
import { PasswordReset } from './PasswordReset';

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
export class User extends ExternalEntity {
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

    static async fromSession(allowedType: AuthType = AuthType.FULL): Promise<User | undefined> {
        const { session } = getCurrentRequest();

        if (session.userID && session.type === allowedType) {
            const user = await this.findOne(session.userID);
            if (user) {
                user.grantType = GrantType.SESSION;
            }
            return user;
        }

        return;
    }

    static async fromTOTPSession(token: string): Promise<User> {
        const { session } = getCurrentRequest();

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

    static async signUp({
        username,
        name,
        email,
        password,
        githubID,
    }: {
        username: string;
        name: string;
        email: string;
        password?: string;
        githubID?: string;
    }) {
        const user = new User();
        user.username = username;
        user.name = name;
        user.githubID = githubID;
        user.email = email;

        if (password) {
            await user.setPassword(password);
        }

        // Create the personal organization:
        const organization = Organization.createPersonal(user);
        user.personalOrganization = organization;

        // Set the users personal organization:
        user.personalOrganization = organization;

        await user.save();

        await user.signIn();

        return user;
    }

    /**
     * Denotes how the User entity was authenticated.
     */
    grantType: GrantType = GrantType.NONE;

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

    async setPassword(newPassword: string) {
        this.passwordHash = await hash(newPassword, SALT_ROUNDS);
    }

    get isPasswordless() {
        return !!this.passwordHash && this.githubID;
    }

    // TODO: Encrypt this somehow.
    @Column('varchar', { nullable: true })
    totpSecret?: string | null;

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

    async signIn(type: AuthType = AuthType.FULL) {
        const { session } = getCurrentRequest();
        session.userID = this.id;
        session.type = type;
        if (type === AuthType.FULL) {
            setUserCookie(this.id);
        }

        // Remove any password reset so that it is no longer valid after signing in:
        await PasswordReset.removeForUser(this);
    }

    signOut() {
        removeUserCookie();
    }

    // TODO: Eventually, we might want this to be done entirely through the OrganizationMembership,
    // rather than as a field directly. We can still have a virtual field that does the lookup for the
    // personal organization membership, and loads the organization through that, but we could avoid
    // some annoying setting up of relations if we model it this way.
    @Field(() => Organization)
    @OneToOne(() => Organization, { lazy: true, cascade: true })
    @JoinColumn()
    personalOrganization!: Lazy<Organization>;

    @OneToMany(
        () => OrganizationMembership,
        membership => membership.user,
        { lazy: true },
    )
    organizationMemberships!: Lazy<OrganizationMembership[]>;

    @OneToMany(
        () => APIKey,
        apiKey => apiKey.user,
        { lazy: true },
    )
    apiKeys!: Lazy<APIKey[]>;
}
