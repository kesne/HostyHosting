import { validateOrReject } from 'class-validator';
import {
    BeforeInsert,
    BeforeUpdate,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

/**
 * An entity that is never exposed externally.
 */
export abstract class InternalEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    readonly id!: string;

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
export abstract class ExternalEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    readonly id!: string;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}
