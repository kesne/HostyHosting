import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Application} from './Application';
import { ObjectType, Field, Int } from 'type-graphql';
import { Length } from 'class-validator';
import { BaseEntity } from './BaseEntity';

@Entity()
@ObjectType()
export class Organization extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

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

    @OneToMany(
        () => User,
        user => user.organization
    )
    users!: User[];

    @OneToMany(
        () => Application,
        application => application.organization
    )
    applications!: Application[];
}
