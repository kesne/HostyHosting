import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Application} from './Application';
import { ObjectType, Field, Int } from 'type-graphql';

@Entity()
@ObjectType()
export class Organization extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    @Field()
    @CreateDateColumn()
    createdAt!: string;

    @Field()
    @UpdateDateColumn()
    updatedAt!: string;

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
