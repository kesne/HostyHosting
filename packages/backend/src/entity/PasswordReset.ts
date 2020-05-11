import {
    Entity,
    OneToOne,
    CreateDateColumn,
    JoinColumn,
    AfterInsert,
} from 'typeorm';
import { User } from './User';
import sendEmail from '../utils/sendEmail';
import { InternalEntity } from './BaseEntity';

@Entity()
export class PasswordReset extends InternalEntity {
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
            `You requested a password reset on Docker As A Service. To complete the password reset, click here: https://hostyhosting.dev/reset-password/${this.uuid}`
        );
    }
}
