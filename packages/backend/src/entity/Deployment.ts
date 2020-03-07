import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Application } from './Application';
import { Container } from './Container';

@Entity()
@ObjectType()
export class Deployment extends BaseEntity {
    static findByApplicationAndId(application: Application, id: number) {
        return Deployment.findOneOrFail({
            where: {
                id,
                application
            }
        });
    }

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    image!: string;

    @Field()
    @CreateDateColumn()
    createdAt!: string;

    @Field()
    @UpdateDateColumn()
    updatedAt!: string;

    @ManyToOne(
        () => Application,
        application => application.containers
    )
    application!: Promise<Application>;

    @Field(() => [Container])
    @OneToMany(
        () => Container,
        container => container.deployment
    )
    containers!: Promise<Container[]>;
}
