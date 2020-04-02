import { BaseEntity } from './BaseEntity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Lazy } from '../types';
import { Application } from './Application';
import { ContainerGroup } from './ContainerGroup';

@ObjectType()
@Entity()
export class Environment extends BaseEntity {
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
        () => Application,
        application => application.environments,
        { lazy: true },
    )
    application!: Lazy<Application>;

    @Field(() => [ContainerGroup])
    @OneToMany(
        () => ContainerGroup,
        containerGroup => containerGroup.deployment,
        { lazy: true },
    )
    containerGroups!: Lazy<ContainerGroup[]>;
}
