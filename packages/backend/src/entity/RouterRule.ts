import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { ExternalEntity } from './BaseEntity';
import { Lazy } from '../types';
import { Router } from './Router';
import { ContainerGroup } from './ContainerGroup';

@ObjectType()
@Entity()
export class RouterRule extends ExternalEntity {
    @ManyToOne(() => Router, { lazy: true })
    router!: Lazy<Router>;

    @Field()
    @Column()
    domain!: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    pathPrefix?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    forwardPathPrefix?: boolean;

    @Field(() => ContainerGroup)
    @ManyToOne(() => ContainerGroup, { lazy: true })
    containerGroup!: Lazy<ContainerGroup>;
}
