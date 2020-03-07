import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToOne,
    CreateDateColumn,
    Column,
    Generated,
    JoinColumn,
    AfterInsert
} from 'typeorm';
import { User } from './User';
import sendEmail from '../utils/sendEmail';

@Entity()
export class PasswordReset extends BaseEntity {
    static async createForEmail(email: string) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('Unknown user for password reset');
        }

        const previousReset = await PasswordReset.findOne({ where: { user } });

        if (previousReset) {
            await previousReset.remove();
        }

        const passwordReset = new PasswordReset();
        passwordReset.user = user;

        await passwordReset.save();
    }

    static async removeForUser(user: User) {
        const previousReset = await PasswordReset.findOne({ where: { user } });

        if (previousReset) {
            await previousReset.remove();
        }
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Generated('uuid')
    uuid!: string;

    @OneToOne(() => User)
    @JoinColumn()
    user!: User;

    @CreateDateColumn()
    createdAt!: string;

    @AfterInsert()
    sendEmail() {
        sendEmail(
            this.user.email,
            'Password Reset',
            `You requested a password reset on Docker As A Service. To complete the password reset, click here: https://daas.dev/reset-password/${this.uuid}`
        );
    }
}
