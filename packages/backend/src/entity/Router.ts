import { Entity, ManyToOne, OneToMany, Column } from 'typeorm';
import { ExternalEntity } from './BaseEntity';
import { ObjectType, Field } from 'type-graphql';
import { Organization } from './Organization';
import { RouterRule } from './RouterRule';
import { Lazy } from '../types';

@ObjectType()
@Entity()
export class Router extends ExternalEntity {
    @Field()
    @Column()
    label!: string;

    @OneToMany(
        () => RouterRule,
        routerRule => routerRule.router,
        { lazy: true, cascade: true },
    )
    rules!: Lazy<RouterRule[]>;

    @Field(() => Organization)
    @ManyToOne(() => Organization, { lazy: true })
    organization!: Lazy<Organization>;
}
