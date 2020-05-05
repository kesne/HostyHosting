import { Environment } from '../entity/Environment';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { Network } from '../entity/Network';
import { Organization } from '../entity/Organization';

@EntityRepository(Environment)
export class EnvironmentRepository extends Repository<Environment> {
    async createForOrganization(organization: Organization, name: string, label: string) {
        const networkRepository = getRepository(Network);

        const network = networkRepository.create({ name });
        await networkRepository.save(network);

        const env = this.create({
            name,
            label,
            networks: [network],
            organization,
        });

        return await this.save(env);
    }

    async createDefaultEnvironments(organization: Organization) {
        await this.createForOrganization(organization, 'prod', 'Production');
        await this.createForOrganization(organization, 'test', 'Test');
    }
}
