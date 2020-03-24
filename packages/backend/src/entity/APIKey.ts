import crypto from 'crypto';
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    BeforeInsert,
} from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class APIKey extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    key!: string;

    @ManyToOne(() => User)
    user!: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @BeforeInsert()
    generateKey() {
        this.key = crypto.randomBytes(64).toString('base64');
    }
}
