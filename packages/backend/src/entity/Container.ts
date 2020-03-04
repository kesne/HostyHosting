import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Application } from './Application';
import { Deployment } from './Deployment';

@Entity()
export class Container extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    // TODO: Size is probably not just a number:
    @Column()
    size!: number;

    // TODO: This column name sux:
    @Column()
    number!: number;

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;

    @ManyToOne(
        () => Application,
        application => application.containers
    )
    application!: Promise<Application>;

    @ManyToOne(
        () => Deployment,
        deployment => deployment.containers
    )
    deployment!: Promise<Deployment>;
}
