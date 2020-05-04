import { Environment } from '../entity/Environment';
import { Repository, EntityRepository } from 'typeorm';
import { Network } from '../entity/Network';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Organization } from '../entity/Organization';

@EntityRepository(Environment)
export class EnvironmentRepository extends Repository<Environment> {
    @InjectRepository(Network)
    private networkRepository!: Repository<Network>;

    async createForOrganization(organization: Organization, name: string, label: string) {
        const network = this.networkRepository.create({ name });
        await this.networkRepository.save(network);

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
