import { Entity, OneToOne, CreateDateColumn, JoinColumn, AfterInsert } from 'typeorm';
import { User } from './User';
import sendEmail from '../utils/sendEmail';
import { InternalEntity } from './BaseEntity';

@Entity()
export class PasswordReset extends InternalEntity {
    // TODO: Maybe rename to createForUser() and take in a pre-resolved user?
    static async createForEmail(email: string) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('Unknown user for password reset');
        }

        const previousReset = await this.findOne({ where: { user } });

        if (previousReset) {
            await this.remove(previousReset);
        }

        const passwordReset = this.create({ user });
        await this.save(passwordReset);
    }

    static async removeForUser(user: User) {
        await this.delete({ user });
    }

    @OneToOne(() => User)
    @JoinColumn()
    user!: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @AfterInsert()
    sendEmail() {
        sendEmail(
            this.user.email,
            'Password Reset',
            `You requested a password reset on Docker As A Service. To complete the password reset, click here: https://hostyhosting.dev/reset-password/${this.uuid}`,
        );
    }
}
