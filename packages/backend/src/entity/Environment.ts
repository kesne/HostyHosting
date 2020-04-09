import { BaseEntity } from './BaseEntity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Network } from './Network';
import { Lazy } from '../types';
import { Organization } from './Organization';

@ObjectType()
@Entity()
export class Environment extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    @OneToMany(
        () => Network,
        network => network.environment,
        { lazy: true },
    )
    networks!: Lazy<Network[]>;

    @Field(() => Organization)
    @ManyToOne(
        () => Organization,
        organization => organization.environments,
        { lazy: true },
    )
    organization!: Lazy<Organization>;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
}
