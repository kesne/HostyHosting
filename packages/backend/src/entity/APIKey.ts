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
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class APIKey extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    // NOTE: Never expose this column externally via GraphQL.
    @Column()
    key!: string;

    @Field()
    @Column()
    description!: String

    @ManyToOne(() => User)
    user!: User;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @BeforeInsert()
    generateKey() {
        this.key = crypto.randomBytes(64).toString('base64');
    }
}
