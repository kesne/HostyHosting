import { Repository, EntityRepository, getRepository } from 'typeorm';
import { Organization } from '../entity/Organization';
import {
    OrganizationPermission,
    permissionIsAtLeast,
    OrganizationMembership,
} from '../entity/OrganizationMembership';
import { User } from '../entity/User';
import { ForbiddenError } from 'type-graphql';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {
    async findForUser(user: User, username: string, permission?: OrganizationPermission) {
        const organizationMembershipRepo = getRepository(OrganizationMembership);

        const organization = await this.findOneOrFail({ where: { username } });

        const membership = await organizationMembershipRepo.findOneOrFail({
            where: {
                user: user,
                organization: organization,
            },
        });

        if (permission && !permissionIsAtLeast(permission, membership.permission)) {
            throw new ForbiddenError();
        }

        return organization;
    }
}
