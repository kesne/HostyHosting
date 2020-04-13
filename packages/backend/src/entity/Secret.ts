import { BaseEntity } from './BaseEntity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Unique,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Lazy } from '../types';
import { Component } from './Component';

@ObjectType()
@Entity()
@Unique(['key', 'component'])
export class Secret extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    key!: string;

    @Field()
    @Column()
    value!: string;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @ManyToOne(
        () => Component,
        component => component.secrets,
        { lazy: true },
    )
    component!: Lazy<Component>;
}
