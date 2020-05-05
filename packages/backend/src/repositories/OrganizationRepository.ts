import { EntityRepository, Repository, getRepository, getCustomRepository } from 'typeorm';
import { Organization } from '../entity/Organization';
import { User } from '../entity/User';
import { OrganizationMembership, OrganizationPermission } from '../entity/OrganizationMembership';
import { EnvironmentRepository } from './EnvironmentRepository';
import { ContainerGroup, containerCountAndSizeToComputeUnits } from '../entity/ContainerGroup';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {
    async createPersonal(user: User) {
        const userRepository = getRepository(User);
        const organizationMembershipRepository = getRepository(OrganizationMembership);
        const environmentRepository = getCustomRepository(EnvironmentRepository);

        // Create a basic organization:
        const organization = this.create({
            name: 'Personal',
            isPersonal: true,
            username: user.username,
        });
        await this.save(organization);

        // TODO: Maybe this should be somewhere else (maybe afterInsert?):
        await environmentRepository.createDefaultEnvironments(organization);

        // Set the users personal organization:
        // TODO: Find a way to avoid this:
        user.personalOrganization = organization;
        await userRepository.save(user);

        // Finally, add the user into their own organization:
        const membership = organizationMembershipRepository.create({
            user,
            organization,
            permission: OrganizationPermission.ADMIN,
        });
        await organizationMembershipRepository.save(membership);
    }

    async getAvailableComputeUnits(organization: Organization) {
        const containerGroupRepo = getRepository(ContainerGroup);

        const containerGroups = await containerGroupRepo.find({
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
