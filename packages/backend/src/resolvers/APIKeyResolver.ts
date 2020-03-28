import { Resolver, Mutation, Query, Arg, Authorized, Ctx, Int } from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';
import redis from '../redis';
import Result from './types/Result';
import { Context } from '../types';
import { APIKey } from '../entity/APIKey';
import { GrantType } from '../entity/User';

const API_KEY_EXPIRATION = 100;
const REQUEST_VALUE = '@@request';

function getRedisKeyName(id: string) {
    return `api-key-request:${id}`;
}

@Resolver()
export class APIKeyResolver {
    @Mutation(() => String)
    async createAPIKeyRequest(): Promise<string> {
        const uuid = uuidv4();

        await redis.set(getRedisKeyName(uuid), REQUEST_VALUE, 'ex', API_KEY_EXPIRATION);
        return uuid;
    }

    @Query(() => String, { nullable: true })
    async getAPIKeyFromRequest(@Arg('uuid') uuid: string): Promise<string | null> {
        const tokenID = await redis.get(getRedisKeyName(uuid));

        if (!tokenID) {
            throw new Error('The API key request was not found.');
        }

        if (tokenID === REQUEST_VALUE) {
            return null;
        }

        const apiKey = await APIKey.findOneOrFail(tokenID);

        // Prevent the API Key from being retrieved multiple times:
        await redis.del(getRedisKeyName(uuid));

        return apiKey.key;
    }

    @Authorized(GrantType.SESSION)
    @Mutation(() => Result)
    async grantAPIKey(@Ctx() { user }: Context, @Arg('uuid') uuid: string): Promise<Result> {
        const request = await redis.get(getRedisKeyName(uuid));
        if (request !== REQUEST_VALUE) {
            throw new Error('The request was not found');
        }

        const apiKey = await user.createAPIKey('HostyHosting CLI');

        await redis.set(getRedisKeyName(uuid), apiKey.id);

        return new Result();
    }

    @Authorized(GrantType.SESSION)
    @Mutation(() => String)
    async createAPIKey(@Ctx() { user }: Context, @Arg('description') description: string): Promise<String> {
        const key = await user.createAPIKey(description);
        return key.key;
    }

    @Authorized(GrantType.SESSION)
    @Mutation(() => Result)
    async deleteAPIKey(@Ctx() { user }: Context, @Arg('id', () => Int) id: number): Promise<Result> {
        const apiKey = await APIKey.findOneOrFail({
            where: {
                id,
                user
            }
        });

        await APIKey.delete(apiKey.id);

        return new Result();
    }
}
