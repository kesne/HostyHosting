import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { BaseEntity } from './BaseEntity';
import { ContainerGroup } from './ContainerGroup';
import { Lazy } from '../types';

export enum Status {
    UNKNOWN = 'UNKNOWN',
    STARTING = 'STARTING',
    RUNNING = 'RUNNING',
    ERROR = 'ERROR',
    CRASHED = 'CRASHED'
}

// TODO: We need to make sure that when we create a container, that we have two
// types of capacity:
//   - System capacity (we litterally have enough hardward to back the container)
//   - User capacity (this user is trusted enough to boot an additional container)
@Entity()
@ObjectType()
export class Container extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({
        type: 'enum',
        enum: Status,
        default: Status.UNKNOWN
    })
    status!: Status;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @Field(() => ContainerGroup)
    @ManyToOne(
        () => ContainerGroup,
        containerGroup => containerGroup.containers,
        { lazy: true }
    )
    containerGroup!: Lazy<ContainerGroup>;
}
