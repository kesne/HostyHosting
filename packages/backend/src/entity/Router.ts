import { Entity, OneToMany, Column, OneToOne, JoinColumn } from 'typeorm';
import { ExternalEntity } from './BaseEntity';
import { ObjectType, Field } from 'type-graphql';
import { Organization } from './Organization';
import { RouterRule } from './RouterRule';
import { Lazy } from '../types';
import { User } from './User';
import { OrganizationPermission } from './OrganizationMembership';

@ObjectType()
@Entity()
export class Router extends ExternalEntity {
    static async findForUser(user: User, id: string) {
        const router = await Router.findOneOrFail({
            where: { id },
            relations: ['organization'],
        });

        const organization = await router.organization;

        organization.ensureUserHasAccess(user, OrganizationPermission.WRITE);

        return router;
    }

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
    @OneToOne(() => Organization, { lazy: true })
    @JoinColumn()
    organization!: Lazy<Organization>;
}
