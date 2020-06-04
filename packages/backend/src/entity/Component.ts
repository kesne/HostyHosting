import { Entity, Column, ManyToOne, JoinColumn, OneToMany, Unique } from 'typeorm';
import { ObjectType, Field, registerEnumType } from 'type-graphql';
import { Application } from './Application';
import { ContainerGroup } from './ContainerGroup';
import { ExternalEntity } from './BaseEntity';
import { Lazy } from '../types';
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
export class Component extends ExternalEntity {
    static findByApplicationAndId(application: Application, id: string) {
        return this.findOneOrFail({
            where: {
                id,
                application,
            },
        });
    }

    @Field()
    @Column()
    @Matches(NAME_REGEX)
    @Length(3, 20)
    name!: string;

    @Field()
    @Column()
    label!: string;

    @Field(() => DeploymentStrategy)
    @Column({ type: 'enum', enum: DeploymentStrategy, default: DeploymentStrategy.RECREATE })
    deploymentStrategy!: DeploymentStrategy;

    // TODO: When you specify the image, we should attempt to resolve it against our
    // registry so that we can verify that this will be "launchable".
    @Field()
    @Column()
    image!: string;

    @Field(() => Application)
    @ManyToOne(
        () => Application,
        application => application.components,
        { lazy: true },
    )
    application!: Lazy<Application>;

    @OneToMany(
        () => ContainerGroup,
        containerGroup => containerGroup.component,
        { lazy: true },
    )
    @JoinColumn()
    containerGroups!: Lazy<ContainerGroup[]>;
}
