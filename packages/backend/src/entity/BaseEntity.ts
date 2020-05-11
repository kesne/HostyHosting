import { validateOrReject } from 'class-validator';
import {
    BeforeInsert,
    BeforeUpdate,
    PrimaryGeneratedColumn,
    Column,
    Generated,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import randomBigInt from 'random-bigint';

/**
 * An entity that is never exposed externally.
 */
export abstract class InternalEntity {
    @PrimaryGeneratedColumn()
    readonly pk!: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}

/**
 * An entity that IS exposed via GraphQL.
 */
@ObjectType()
export abstract class ExternalEntity {
    @PrimaryGeneratedColumn()
    readonly pk!: number;

    @Field(() => ID)
    @Column({ unique: true })
    readonly id!: string;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @BeforeInsert()
    generateExternalID() {
        // @ts-ignore: We intentionally assign into a read-only property here:
        this.id = randomBigInt(128).toString(36);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}
