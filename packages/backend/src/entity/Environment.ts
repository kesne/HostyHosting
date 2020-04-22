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
import { Matches, Length } from 'class-validator';
import { NAME_REGEX } from '../constants';

@ObjectType()
@Entity()
export class Environment extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    @Matches(NAME_REGEX)
    @Length(3, 20)
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
