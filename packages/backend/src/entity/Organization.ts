import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Application} from './Application';

@Entity()
export class Organization extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @CreateDateColumn()
    createdAt!: string;

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
