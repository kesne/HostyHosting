import { UserRepository } from './UserRepository';
import { PasswordReset } from '../entity/PasswordReset';
import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { User } from '../entity/User';

@EntityRepository(PasswordReset)
export class PasswordResetRepository extends Repository<PasswordReset> {
    // TODO: Maybe move to createForUser()?
    async createForEmail(email: string) {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Unknown user for password reset');
        }

        const previousReset = await this.findOne({ where: { user } });

        if (previousReset) {
            await this.remove(previousReset);
        }

        const passwordReset = this.create({ user });
        await this.save(passwordReset);
    }

    async removeForUser(user: User) {
        await this.delete({ user });
    }
}
