import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Application } from './Application';
import { Deployment } from './Deployment';
import { ObjectType, Field, Int, registerEnumType } from 'type-graphql';
import { Length, Min, Max } from 'class-validator';
import { BaseEntity } from './BaseEntity';
import { Lazy } from '../types';

export enum ContainerSize {
    S1x1 = 'S1x1', // 1 CPU Share, 128 mb
    S2x2 = 'S2x2', // 2 CPU Share, 256 mb
    S4x4 = 'S4x4', // 4 CPU Share, 512 mb
    S8x8 = 'S8x8', // 8 CPU Share, 1024 mb
    S16x16 = 'S16x16' // 16 CPU Share, 2048 mb
}

registerEnumType(ContainerSize, {
    name: 'ContainerSize'
});

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

    @Field(() => ContainerSize)
    @Column({ type: 'enum', enum: ContainerSize })
    size!: ContainerSize;

    @Field()
    @Column()
    @Min(1)
    // TODO: This maxumum value should really be a dynamic per-account value.
    @Max(10)
    containerCount!: number;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

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
