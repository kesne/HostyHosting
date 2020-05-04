import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from './UserRepository';
import { PasswordReset } from '../entity/PasswordReset';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';

@EntityRepository(PasswordReset)
export class PasswordResetRepository extends Repository<PasswordReset> {
    @InjectRepository()
    private userRepository!: UserRepository;

    async createForEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Unknown user for password reset');
        }

        const previousReset = await this.findOne({ where: { user } });

        if (previousReset) {
            await this.remove(previousReset);
        }

        const passwordReset = new PasswordReset();
        passwordReset.user = user;

        await this.save(passwordReset);
    }

    async removeForUser(user: User) {
        await this.delete({ user });
    }
}
