import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Organization } from './Organization';
import { User } from './User';

@Entity()
export class Application extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
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
}
