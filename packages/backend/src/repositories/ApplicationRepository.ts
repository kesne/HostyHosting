import { Repository, EntityRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Application } from '../entity/Application';
import { User } from '../entity/User';
import {
    OrganizationMembership,
    OrganizationPermission,
    permissionIsAtLeast,
} from '../entity/OrganizationMembership';
import { ForbiddenError } from 'type-graphql';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {
    @InjectRepository(OrganizationMembership)
    organizationMembershipRepo!: Repository<OrganizationMembership>;

    /**
     * Loads an application and verifies that a given user has access
     * to this application. If they do not, it will throw.
     */
    async findForUser(user: User, id: number, permission?: OrganizationPermission) {
        const application = await this.findOneOrFail({
            where: {
                id,
            },
            relations: ['organization'],
        });

        console.log(application.organization);

        const membership = await this.organizationMembershipRepo.findOneOrFail({
            where: {
                user,
                organization: await application.organization,
            },
        });

        if (permission && !permissionIsAtLeast(permission, membership.permission)) {
            throw new ForbiddenError();
        }

        return application;
    }
}
