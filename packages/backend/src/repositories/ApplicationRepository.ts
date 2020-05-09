import { Repository, EntityRepository, getRepository } from 'typeorm';
import { Application } from '../entity/Application';
import { User } from '../entity/User';
import {
    OrganizationMembership,
    OrganizationPermission,
    permissionIsAtLeast,
} from '../entity/OrganizationMembership';
import { ForbiddenError } from 'type-graphql';
import { Organization } from '../entity/Organization';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {
    /**
     * Loads an application and verifies that a given user has access
     * to this application. If they do not, it will throw.
     */
    async findForUserAndOrganization(
        user: User,
        organization: Organization,
        name: string,
        permission?: OrganizationPermission,
    ) {
        const organizationMembershipRepo = getRepository(OrganizationMembership);

        const [membership, application] = await Promise.all([
            organizationMembershipRepo.findOneOrFail({
                where: {
                    user,
                    organization,
                },
            }),
            this.findOneOrFail({
                where: {
                    name,
                    organization,
                },
            }),
        ]);

        if (permission && !permissionIsAtLeast(permission, membership.permission)) {
            throw new ForbiddenError();
        }

        return application;
    }
}
