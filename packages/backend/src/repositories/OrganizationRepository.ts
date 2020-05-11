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
    async findForUser(
        user: User,
        condition: { id: string } | { username: string },
        permission?: OrganizationPermission,
    ) {
        const organizationMembershipRepo = getRepository(OrganizationMembership);

        const where = 'id' in condition ? { id: condition.id } : { username: condition.username };
        const organization = await this.findOneOrFail({ where });

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
