import { authenticator } from 'otplib';
import { Repository, EntityRepository } from 'typeorm';
import { User, GrantType, AuthType } from '../entity/User';
import { APIKey } from '../entity/APIKey';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Session, Cookies } from '../types';
import { OrganizationRepository } from './OrganizationRepository';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    @InjectRepository(APIKey)
    private apiKeyRepository!: Repository<APIKey>;

    @InjectRepository()
    private organizationRepository!: OrganizationRepository;

    async fromAPIKey(apiKey: string): Promise<User | undefined> {
        const key = await this.apiKeyRepository.findOne({
            where: {
                key: apiKey,
            },
            relations: ['user'],
        });

        if (key?.user) {
            key.user.grantType = GrantType.API_KEY;
        }

        return key?.user;
    }

    async fromSession(
        session: Session,
        allowedType: AuthType = AuthType.FULL,
    ): Promise<User | undefined> {
        if (session.userID && session.type === allowedType) {
            const user = await this.findOne(session.userID);
            if (user) {
                user.grantType = GrantType.SESSION;
            }
            return user;
        }
        return;
    }

    async fromTOTPSession(session: Session, token: string): Promise<User> {
        if (!session.userID || session.type !== AuthType.TOTP) {
            throw new Error('No TOTP session currently exists.');
        }

        const user = await this.findOne(session.userID);
        if (!user || !user.totpSecret) {
            throw new Error('No user was found in the current session.');
        }

        const isValid = authenticator.verify({ secret: user.totpSecret, token });
        if (!isValid) {
            throw new Error('The TOTP token provided was not valid.');
        }

        return user;
    }

    async signUp(
        session: Session,
        cookies: Cookies,
        {
            username,
            name,
            email,
            password,
            githubID,
        }: { username: string; name: string; email: string; password?: string; githubID?: string },
    ) {
        const user = this.create({
            username,
            name,
            githubID,
            email
        });

        if (password) {
            await user.setPassword(password);
        }

        await this.save(user);
        await this.organizationRepository.createPersonal(user);

        user.signIn(session, cookies);
    }
}
