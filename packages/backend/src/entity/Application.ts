import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Organization } from './Organization';
import { User } from './User';
import { Container } from './Container';
import { Deployment } from './Deployment';

@Entity()
export class Application extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ default: '' })
    description!: string;

    // TODO: What happens if a user deletes their account:
    @ManyToOne(() => User)
    createdBy!: Promise<User>;

    @Column('json', { nullable: true })
    secrets!: Record<string, string>;

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;

    @ManyToOne(
        () => Organization,
        organization => organization.users
    )
    organization!: Promise<Organization>;

    @OneToMany(
        () => Container,
        container => container.application
    )
    containers!: Promise<Container[]>;

    @OneToMany(
        () => Deployment,
        deployment => deployment.application
    )
    deployments!: Promise<Deployment[]>;
}
