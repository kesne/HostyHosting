import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Organization } from '../entity/Organization';
import { User } from '../entity/User';
import { OrganizationMembership, OrganizationPermission } from '../entity/OrganizationMembership';
import { EnvironmentRepository } from './EnvironmentRepository';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {

    @InjectRepository(User)
    private userRepository!: Repository<User>;

    @InjectRepository(OrganizationMembership)
    private organizationMembershipRepository!: Repository<OrganizationMembership>;

    @InjectRepository()
    private environmentRepository!: EnvironmentRepository;

    async createPersonal(user: User) {
        // Create a basic organization:
        const organization = new Organization();
        organization.name = 'Personal';
        organization.isPersonal = true;
        organization.username = user.username;
        await this.save(organization);

        // TODO: Maybe this should be somewhere else (maybe afterInsert?):
        await this.environmentRepository.createDefaultEnvironments(organization);

        // Set the users personal organization:
        user.personalOrganization = organization;
        await this.userRepository.save(user);


        // Finally, add the user into their own organization:
        const membership = new OrganizationMembership();
        membership.user = user;
        membership.organization = organization;
        membership.permission = OrganizationPermission.ADMIN;
        await this.organizationMembershipRepository.save(membership);
    }
}
