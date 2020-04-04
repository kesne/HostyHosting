import { BaseEntity } from './BaseEntity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Lazy } from '../types';
import { Environment } from './Environment';

@ObjectType()
@Entity()
export class Network extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @ManyToOne(
        () => Environment,
        environment => environment.networks,
        { lazy: true },
    )
    environment!: Lazy<Environment>;
}
