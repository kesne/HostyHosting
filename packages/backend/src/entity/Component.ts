import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { ObjectType, Field, Int, registerEnumType } from 'type-graphql';
import { Application } from './Application';
import { ContainerGroup } from './ContainerGroup';
import { BaseEntity } from './BaseEntity';
import { Lazy } from '../types';

export enum DeploymentStrategy {
    REPLACE = 'REPLACE', // 1-to-1 replacement (rolling update)
    RECREATE = 'RECREATE' // Other services default (kill all then deploy)
}

registerEnumType(DeploymentStrategy, {
    name: 'DeploymentStrategy'
});

@Entity()
@ObjectType()
export class Component extends BaseEntity {
    static findByApplicationAndId(application: Application, id: number) {
        return Component.findOneOrFail({
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
    name!: string;

    @Field(() => DeploymentStrategy)
    @Column({ type: 'enum', enum: DeploymentStrategy, default: DeploymentStrategy.RECREATE })
    deploymentStrategy!: DeploymentStrategy;

    // TODO: When you specify the image, we should attempt to resolve it against our
    // registry so that we can verify that this will be "launchable".
    @Field()
    @Column()
    image!: string;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @ManyToOne(
        () => Application,
        application => application.components,
        { lazy: true }
    )
    application!: Lazy<Application>;

    @Field(() => ContainerGroup)
    @OneToOne(
        () => ContainerGroup,
        containerGroup => containerGroup.component,
        { lazy: true }
    )
    @JoinColumn()
    containerGroup!: Lazy<ContainerGroup>;
}
