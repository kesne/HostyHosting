import {
    Entity,
    Column,
    ManyToOne,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
    Unique,
} from 'typeorm';
import { Component, DeploymentStrategy } from './Component';
import { ObjectType, Field, registerEnumType } from 'type-graphql';
import { Min } from 'class-validator';
import { ExternalEntity } from './BaseEntity';
import { Lazy } from '../types';
import { Environment } from './Environment';
import { Organization } from './Organization';
import { Secret } from './Secret';

export enum ContainerSize {
    S1x1 = 'S1x1', // 1 Compute Unit, 128 mb
    S2x2 = 'S2x2', // 2 Compute Unit, 256 mb
    S4x4 = 'S4x4', // 4 Compute Unit, 512 mb
    S8x8 = 'S8x8', // 8 Compute Unit, 1024 mb
    S16x16 = 'S16x16', // 16 Compute Unit, 2048 mb
}

registerEnumType(ContainerSize, {
    name: 'ContainerSize',
});

const COUNT_MULTIPLIER = {
    [ContainerSize.S1x1]: 1,
    [ContainerSize.S2x2]: 2,
    [ContainerSize.S4x4]: 4,
    [ContainerSize.S8x8]: 8,
    [ContainerSize.S16x16]: 16,
};

export function containerCountAndSizeToComputeUnits(count: number, size: ContainerSize) {
    return count * COUNT_MULTIPLIER[size];
}

// TODO: Store the actual compute unit usage of the container group.
@Entity()
@ObjectType()
@Unique(['component', 'environment'])
export class ContainerGroup extends ExternalEntity {
    @Field(() => ContainerSize)
    @Column({ type: 'enum', enum: ContainerSize })
    readonly size!: ContainerSize;
    private previousSize?: ContainerSize;

    setSize(size: ContainerSize) {
        this.previousSize = this.size;
        // @ts-ignore: This is intentionally writing into a readonly field:
        this.size = size;
    }

    @Field()
    @Column()
    @Min(1)
    readonly containerCount!: number;
    private previousContainerCount?: number;

    setContainerCount(count: number) {
        this.previousContainerCount = this.containerCount;
        // @ts-ignore: This is intentionally writing into a readonly field:
        this.containerCount = count;
    }

    @Field(() => Environment)
    @ManyToOne(() => Environment, { lazy: true })
    environment!: Lazy<Environment>;

    @Field(() => Component)
    @ManyToOne(
        () => Component,
        component => component.containerGroups,
        { lazy: true },
    )
    component!: Lazy<Component>;

    @OneToMany(
        () => Secret,
        secret => secret.containerGroup,
        { lazy: true },
    )
    secrets!: Lazy<Secret[]>;

    @ManyToOne(() => Organization, { lazy: true })
    organization!: Lazy<Organization>;

    @BeforeInsert()
    @BeforeUpdate()
    async validateSize() {
        const organization = await this.organization;

        const containerGroups = await ContainerGroup.find({
            where: {
                organization: organization,
            },
        });

        const availableUnits =
            organization.maxComputeUnits -
            containerGroups.reduce(
                (acc, curr) =>
                    acc + containerCountAndSizeToComputeUnits(curr.containerCount, curr.size),
                0,
            );

        const desiredComputeUnits = containerCountAndSizeToComputeUnits(
            this.containerCount,
            this.size,
        );

        if (!this.id) {
            // New
            if (desiredComputeUnits > availableUnits) {
                throw new Error('Not enough available units.');
            }
        } else {
            const offsetComputeUnits = containerCountAndSizeToComputeUnits(
                this.previousContainerCount ?? this.containerCount,
                this.previousSize ?? this.size,
            );

            if (desiredComputeUnits > availableUnits + offsetComputeUnits) {
                throw new Error('Not enough available units.');
            }
        }
    }
}
