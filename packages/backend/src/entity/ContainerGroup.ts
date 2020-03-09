import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Application } from './Application';
import { Deployment } from './Deployment';
import { ObjectType, Field, Int } from 'type-graphql';
import { Length, Min, Max } from 'class-validator';
import { BaseEntity } from './BaseEntity';
import { Lazy } from '../types';
import { Container } from './Container';

@Entity()
@ObjectType()
export class ContainerGroup extends BaseEntity {
    static findByApplicationAndId(application: Application, id: number) {
        return ContainerGroup.findOneOrFail({
            where: {
                id,
                application
            }
        });
    }

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    @Length(3, 20)
    label!: string;

    // TODO: Should this be an enum of the supported types for sizes?
    @Field(() => Int)
    @Column()
    @Min(1)
    @Max(5)
    size!: number;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @Field(() => [Container])
    @OneToMany(
        () => Container,
        container => container.containerGroup,
        { lazy: true }
    )
    containers!: Lazy<Container[]>;

    @ManyToOne(
        () => Application,
        application => application.containerGroups,
        { lazy: true }
    )
    application!: Lazy<Application>;

    @Field(() => Deployment)
    @ManyToOne(
        () => Deployment,
        deployment => deployment.containerGroups,
        { lazy: true }
    )
    deployment!: Lazy<Deployment>;
}
