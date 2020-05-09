import { BaseEntity } from './BaseEntity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Unique,
    Generated,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Lazy } from '../types';
import { ContainerGroup } from './ContainerGroup';

@ObjectType()
@Entity()
@Unique(['key', 'containerGroup'])
export class Secret extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    @Generated('uuid')
    uuid!: string;

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
        () => ContainerGroup,
        containerGroup => containerGroup.secrets,
        { lazy: true },
    )
    containerGroup!: Lazy<ContainerGroup>;
}
