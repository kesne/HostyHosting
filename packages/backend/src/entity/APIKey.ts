import crypto from 'crypto';
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    BeforeInsert,
    Generated,
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

    @Field()
    @Column()
    @Generated('uuid')
    uuid!: string;

    // NOTE: Never expose this column externally via GraphQL.
    @Column()
    key!: string;

    // NOTE: This is only ever exposed when creating an API Key from a session.
    // It is only initialized in the BeforeInsert method, so it should never be
    // initialized to a value when loading from the database.
    @Field({ nullable: true })
    privateKey?: string;

    @Field()
    @Column()
    description!: String;

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
        this.privateKey = this.key;
    }
}
