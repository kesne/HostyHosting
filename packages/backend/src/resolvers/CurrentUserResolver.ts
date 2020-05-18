import { Resolver, FieldResolver, ObjectType, Ctx, Args, Authorized, Query } from 'type-graphql';
import { User } from '../entity/User';
import { Context } from '../types';
import { ConnectionArgs } from './types/Pagination';
import { APIKeyConnection } from './APIKeyResolver';

@ObjectType()
export class CurrentUser extends User {}

@Resolver(() => CurrentUser)
export class CurrentUserResolver {
    @Authorized()
    @Query(() => CurrentUser)
    async viewer(@Ctx() { user }: Context): Promise<User> {
        return user;
    }

    @FieldResolver()
    hasTOTP(@Ctx() { user }: Context): boolean {
        return !!user.totpSecret;
    }

    @FieldResolver(() => APIKeyConnection)
    async apiKeys(@Ctx() { user }: Context, @Args() _args: ConnectionArgs) {
        return {
            edges: (await user.apiKeys).map(key => ({ node: key, cursor: key.id })),
            pageInfo: { hasNextPage: false, hasPreviousPage: false },
        };
        // return this.apiKeyRepo.findAndCount({
        //     where: {
        //         user,
        //     },
        //     take: limit,
        //     skip: offset,
        // });
    }
}
