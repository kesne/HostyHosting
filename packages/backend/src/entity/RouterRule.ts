import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { ExternalEntity } from './BaseEntity';
import { Component } from './Component';
import { Environment } from './Environment';
import { Lazy } from '../types';
import { Router } from './Router';

@ObjectType()
@Entity()
export class RouterRule extends ExternalEntity {
    @ManyToOne(() => Router, { lazy: true })
    router!: Lazy<Router>;

    @Field()
    @Column()
    domain!: string;

    @Field()
    @Column()
    pathPrefix!: string;

    @Field()
    @Column({ default: true })
    forwardPathPrefix: boolean = true;

    // TODO: Should this be a ContainerGroup or should we keep it at this level?
    @Field(() => Component)
    @ManyToOne(() => Component, { lazy: true })
    component!: Lazy<Component>;

    @Field(() => Environment)
    @ManyToOne(() => Environment, { lazy: true })
    environment!: Lazy<Environment>;
}
