import { authenticator } from 'otplib';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { Session, Cookies } from '../types';
import { Organization } from './Organization';

// NOTE: This was chosed based on a stack overflow post. Probably should do more
// research if you ever deploy this for real.
const SALT_ROUNDS = 10;

export enum AuthType {
    FULL = 'FULL',
    TOTP = 'TOTP',
    PASSWORD_RESET = 'PASSWORD_RESET'
}

@Entity()
export class User extends BaseEntity {
    static async fromSession(
        session: Session,
        allowedType: AuthType = AuthType.FULL
    ): Promise<User | undefined> {
        if (session.userID && session.type === allowedType) {
            return await this.findOne(session.userID);
        }
        return;
    }

    static async fromTOTPSession(session: Session, token: string): Promise<User | undefined> {
        if (!session.userID || session.type !== AuthType.TOTP) {
            return;
        }

        const user = await this.findOne(session.userID);
        if (!user || !user.totpSecret) {
            return;
        }

        const isValid = authenticator.verify({ secret: user.totpSecret, token });
        if (!isValid) {
            return;
        }

        return user;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column('citext', { unique: true })
    email!: string;

    @Column()
    passwordHash!: string;

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;

    async setPassword(newPassword: string) {
        console.log('CALLING SET PASSWORD');
        this.passwordHash = await hash(newPassword, SALT_ROUNDS);
    }

    // TODO: Encrypt this somehow.
    @Column('varchar', { nullable: true })
    totpSecret?: string | null;

    get hasTOTP() {
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

    @ManyToOne(() => Organization, (organization) => organization.users)
    organization!: Promise<Organization>;
}
