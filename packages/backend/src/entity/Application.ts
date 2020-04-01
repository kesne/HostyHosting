import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { Organization } from './Organization';
import { User } from './User';
import { ContainerGroup } from './ContainerGroup';
import { Deployment } from './Deployment';
import { ObjectType, Field, Int } from 'type-graphql';
import { Length } from 'class-validator';
import { BaseEntity } from './BaseEntity';
import { Lazy } from '../types';
import { OrganizationMembership } from './OrganizationMembership';

@Entity()
@ObjectType()
export class Application extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    // NOTE: We don't enforce casing or spaces or anything else currently. This
    // might make it hard to work with CLIs, so we might want to consider it in
    // the future.
    @Field()
    @Column()
    @Length(3, 20)
    name!: string;

    @Field()
    @Column({ default: '' })
    @Length(0, 250)
    description!: string;

    // TODO: What happens if a user deletes their account:
    @Field(() => User, { nullable: true })
    @ManyToOne(() => User, { lazy: true })
    createdBy!: Lazy<User>;

    @Column('json', { nullable: true })
    secrets!: Record<string, string>;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @Field(() => Organization)
    @ManyToOne(
        () => Organization,
        organization => organization.users,
        { lazy: true }
    )
    organization!: Lazy<Organization>;

    @Field(() => [ContainerGroup])
    @OneToMany(
        () => ContainerGroup,
        containerGroup => containerGroup.application,
        { lazy: true }
    )
    containerGroups!: Lazy<ContainerGroup[]>;

    @Field(() => [Deployment])
    @OneToMany(
        () => Deployment,
        deployment => deployment.application,
        { lazy: true }
    )
    deployments!: Lazy<Deployment[]>;

    /**
     * Verifies that a given user has access to this applciation.
     * If they do not, it will throw.
     */
    async userHasPermission(user: User) {
        await OrganizationMembership.findOneOrFail({
            where: {
                user,
                organization: await this.organization
            }
        });
    }
}
