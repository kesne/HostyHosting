import { ExternalEntity } from './BaseEntity';
import {
    Entity,
    Column,
    ManyToOne,
    Unique,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Lazy } from '../types';
import { ContainerGroup } from './ContainerGroup';

@ObjectType()
@Entity()
@Unique(['key', 'containerGroup'])
export class Secret extends ExternalEntity {
    @Field()
    @Column()
    key!: string;

    @Field()
    @Column()
    value!: string;

    @ManyToOne(
        () => ContainerGroup,
        containerGroup => containerGroup.secrets,
        { lazy: true },
    )
    containerGroup!: Lazy<ContainerGroup>;
}
