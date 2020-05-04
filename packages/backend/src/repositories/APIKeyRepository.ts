import { User } from '../entity/User';
import { Repository, EntityRepository } from 'typeorm';
import { APIKey } from '../entity/APIKey';

@EntityRepository(APIKey)
export class APIKeyRepository extends Repository<APIKey> {
    async createForUser(user: User, description: string) {
        const apiKey = this.create({
            description,
            user
        });

        return await this.save(apiKey);
    }
}
