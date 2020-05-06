import { authenticator } from 'otplib';
import {
    Repository,
    EntityRepository,
    getRepository,
} from 'typeorm';
import { User, GrantType, AuthType } from '../entity/User';
import { APIKey } from '../entity/APIKey';
import { Session, Cookies } from '../types';
import { Organization } from '../entity/Organization';
import { Environment } from '../entity/Environment';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async fromAPIKey(apiKey: string): Promise<User | undefined> {
        const apiKeyRepository = getRepository(APIKey);
        const key = await apiKeyRepository.findOne({
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
        await this.manager.transaction(async manager => {
            const user = new User();
            user.username = username;
            user.name = name;
            user.githubID = githubID;
            user.email = email;

            if (password) {
                await user.setPassword(password);
            }

            await manager.save(user);

            // Create a basic organization:
            const { organization, membership } = Organization.createPersonal(user);

            await manager.save(organization);
            await manager.save(membership);

            // Create the default environments:
            const prodEnv = Environment.createForOrganization(organization, 'prod', 'Production');
            const testEnv = Environment.createForOrganization(organization, 'test', 'Test');

            await manager.save(prodEnv);
            await manager.save(testEnv);

            // Set the users personal organization:
            // TODO: Find a way to avoid this:
            user.personalOrganization = organization;
            await manager.save(user);

            user.signIn(session, cookies);
        });
    }
}
