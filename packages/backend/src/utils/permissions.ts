import { createMethodDecorator, ForbiddenError } from 'type-graphql';
import {
    OrganizationPermission,
    OrganizationMembership,
    permissionIsAtLeast,
} from '../entity/OrganizationMembership';
import { Organization } from '../entity/Organization';
import { Context } from '../types';

export function OrganizationAccess<T>(
    _typeFn: () => T,
    getOrganization: (
        arg: T extends new (...args: any) => any ? InstanceType<T> : T,
    ) => Organization | Promise<Organization>,
    permission: OrganizationPermission,
) {
    return createMethodDecorator<Context>(async ({ root, context }, next) => {
        const organization = await getOrganization(root);

        const membership = await OrganizationMembership.findOneOrFail({
            where: {
                user: context.user,
                organization: organization,
            },
        });

        if (!permissionIsAtLeast(permission, membership.permission)) {
            throw new ForbiddenError();
        }

        return next();
    });
}
