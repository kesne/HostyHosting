import { ExternalEntity } from './BaseEntity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Lazy } from '../types';
import { Environment } from './Environment';

@ObjectType()
@Entity()
export class Network extends ExternalEntity {
    @Field()
    @Column()
    name!: string;

    @ManyToOne(
        () => Environment,
        environment => environment.networks,
        { lazy: true },
    )
    environment!: Lazy<Environment>;
}
