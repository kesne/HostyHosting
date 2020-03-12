import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Application} from './Application';
import { ObjectType, Field, Int } from 'type-graphql';
import { Length } from 'class-validator';
import { BaseEntity } from './BaseEntity';
import { Lazy } from '../types';

@Entity()
@ObjectType()
export class Organization extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * Denotes if a organization is a "Personal" organization.
     */
    @Field()
    @Column({ default: false })
    isPersonal!: boolean;

    @Field()
    @Column()
    @Length(3, 20)
    name!: string;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @ManyToMany(
        () => User,
        user => user.organizations,
        { lazy: true }
    )
    @JoinTable()
    users!: Lazy<User[]>;

    @OneToMany(
        () => Application,
        application => application.organization
    )
    applications!: Application[];
}
