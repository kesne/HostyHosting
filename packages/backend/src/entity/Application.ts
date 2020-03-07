import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { Organization } from './Organization';
import { User } from './User';
import { Container } from './Container';
import { Deployment } from './Deployment';
import { ObjectType, Field, Int } from 'type-graphql';

@Entity()
@ObjectType()
export class Application extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column({ default: '' })
    description!: string;

    // TODO: What happens if a user deletes their account:
    @Field(() => User, { nullable: true })
    @ManyToOne(() => User)
    createdBy!: Promise<User>;

    @Column('json', { nullable: true })
    secrets!: Record<string, string>;

    @Field()
    @CreateDateColumn()
    createdAt!: string;

    @Field()
    @UpdateDateColumn()
    updatedAt!: string;

    @Field(() => Organization)
    @ManyToOne(
        () => Organization,
        organization => organization.users
    )
    organization!: Promise<Organization>;

    @Field(() => [Container])
    @OneToMany(
        () => Container,
        container => container.application
    )
    containers!: Promise<Container[]>;

    @Field(() => [Deployment])
    @OneToMany(
        () => Deployment,
        deployment => deployment.application
    )
    deployments!: Promise<Deployment[]>;
}
