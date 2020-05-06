import { Environment } from '../entity/Environment';
import { Repository, EntityRepository } from 'typeorm';
import { Network } from '../entity/Network';
import { Organization } from '../entity/Organization';

@EntityRepository(Environment)
export class EnvironmentRepository extends Repository<Environment> {
    async createForOrganization(
        organization: Organization,
        name: string,
        label: string,
        manager = this.manager,
    ) {
        const network = new Network();
        network.name = name;
        await manager.save(network);

        const env = this.create({
            name,
            label,
            networks: [network],
            organization,
        });

        return await this.save(env);
    }

    async createDefaultEnvironments(organization: Organization, manager = this.manager) {
        await this.createForOrganization(organization, 'prod', 'Production', manager);
        await this.createForOrganization(organization, 'test', 'Test', manager);
    }
}
