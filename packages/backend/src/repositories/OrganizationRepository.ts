import { EntityRepository, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Organization } from '../entity/Organization';
import { User } from '../entity/User';
import { OrganizationMembership, OrganizationPermission } from '../entity/OrganizationMembership';
import { EnvironmentRepository } from './EnvironmentRepository';
import { ContainerGroup, containerCountAndSizeToComputeUnits } from '../entity/ContainerGroup';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {
    @InjectRepository(User)
    private userRepository!: Repository<User>;

    @InjectRepository(OrganizationMembership)
    private organizationMembershipRepository!: Repository<OrganizationMembership>;

    @InjectRepository()
    private environmentRepository!: EnvironmentRepository;

    @InjectRepository(ContainerGroup)
    private containerGroupRepo!: Repository<ContainerGroup>;

    async createPersonal(user: User) {
        // Create a basic organization:
        const organization = this.create({
            name: 'Personal',
            isPersonal: true,
            username: user.username,
        });
        await this.save(organization);

        // TODO: Maybe this should be somewhere else (maybe afterInsert?):
        await this.environmentRepository.createDefaultEnvironments(organization);

        // Set the users personal organization:
        user.personalOrganization = organization;
        await this.userRepository.save(user);

        // Finally, add the user into their own organization:
        const membership = this.organizationMembershipRepository.create({
            user,
            organization,
            permission: OrganizationPermission.ADMIN
        });
        await this.organizationMembershipRepository.save(membership);
    }

    async getAvailableComputeUnits(organization: Organization) {
        const containerGroups = await this.containerGroupRepo.find({
            where: {
                organization,
            },
        });

        return (
            organization.maxComputeUnits -
            containerGroups.reduce(
                (acc, curr) =>
                    acc + containerCountAndSizeToComputeUnits(curr.containerCount, curr.size),
                0,
            )
        );
    }
}
