import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToMany,
    Unique,
} from 'typeorm';
import { ObjectType, Field, Int, registerEnumType } from 'type-graphql';
import { Application } from './Application';
import { ContainerGroup } from './ContainerGroup';
import { BaseEntity } from './BaseEntity';
import { Lazy } from '../types';
import { Secret } from './Secret';
import { Matches, Length } from 'class-validator';
import { NAME_REGEX } from '../constants';

export enum DeploymentStrategy {
    REPLACE = 'REPLACE', // 1-to-1 replacement (rolling update)
    RECREATE = 'RECREATE', // Other services default (kill all then deploy)
}

registerEnumType(DeploymentStrategy, {
    name: 'DeploymentStrategy',
});

@Entity()
@ObjectType()
@Unique(['name', 'application'])
export class Component extends BaseEntity {
    static findByApplicationAndId(application: Application, id: number) {
        return Component.findOneOrFail({
            where: {
                id,
                application,
            },
        });
    }

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    @Matches(NAME_REGEX)
    @Length(3, 20)
    name!: string;

    // TODO: We will probably want to move this definition down into container groups:
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
        { lazy: true },
    )
    application!: Lazy<Application>;

    @Field(() => [ContainerGroup])
    @OneToMany(
        () => ContainerGroup,
        containerGroup => containerGroup.component,
        { lazy: true },
    )
    @JoinColumn()
    containerGroups!: Lazy<ContainerGroup[]>;
}
