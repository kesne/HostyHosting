import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Application } from './Application';
import { Container } from './Container';

@Entity()
export class Deployment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    image!: string;

    @CreateDateColumn()
    createdAt!: string;

    @UpdateDateColumn()
    updatedAt!: string;

    @ManyToOne(
        () => Application,
        application => application.containers
    )
    application!: Promise<Application>;

    @OneToMany(
        () => Container,
        container => container.deployment
    )
    containers!: Promise<Container[]>;
}
