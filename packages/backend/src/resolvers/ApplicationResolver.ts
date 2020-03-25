import { Resolver, FieldResolver, Root, Authorized, Query, Ctx, Arg, Int } from 'type-graphql';
import { Application } from '../entity/Application';
import { Secret } from './types/Secret';
import { Context } from '../types';
import { OrganizationMembership } from '../entity/OrganizationMembership';

// There are two ways to implement permissions.
//    1. We could implement the GraphQL layer
//       a. Implement via @Authorized decortor
//       b. Implement in the resolver
//    2. We could implement in the model layer
//       a. Implement directly into the models
//       b. Implement helpers on the models to determine permissions

@Resolver(() => Application)
export class ApplicationResolver {
    @Authorized()
    @Query(() => Application)
    async application(@Ctx() { user }: Context, @Arg('id', () => Int) id: number) {
        const app = await Application.findOneOrFail({
            where: {
                id,
            }
        });

        // Look up the organization based on the app to ensure that we will have the
        await OrganizationMembership.findOneOrFail({
            where: {
                user,
                organization: await app.organization
            }
        });

        return app;
    }

    @FieldResolver(() => [Secret])
    secrets(@Root() app: Application): Secret[] {
        if (!app.secrets) {
            return [];
        }

        return Object.entries(app.secrets).map(([key, value]) => ({ key, value }));
    }
}
