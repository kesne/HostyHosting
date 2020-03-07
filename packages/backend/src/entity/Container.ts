import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { Application } from './Application';
import { Deployment } from './Deployment';
import { ObjectType, Field, Int } from 'type-graphql';

@Entity()
@ObjectType()
export class Container extends BaseEntity {
    static findByApplicationAndId(application: Application, id: number) {
        return Container.findOneOrFail({
            where: {
                id,
                application
            }
        });
    }

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    // TODO: Size is probably not just a number:
    @Field(() => Int)
    @Column()
    size!: number;

    // TODO: This column name sux:
    @Field(() => Int)
    @Column()
    number!: number;

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

    @Field(() => Deployment)
    @ManyToOne(
        () => Deployment,
        deployment => deployment.containers
    )
    deployment!: Promise<Deployment>;
}
