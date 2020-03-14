import { Resolver, FieldResolver, Root, Authorized, Query, Ctx, Arg, Int } from 'type-graphql';
import { Application } from '../entity/Application';
import { Secret } from './types/Secret';
import { In } from 'typeorm';
import { Context } from '../types';

@Resolver(() => Application)
export class ApplicationResolver {
    @Authorized()
    @Query(() => Application)
    async application(@Ctx() { user }: Context, @Arg('id', () => Int) id: number) {
        const organizations = await user.organizations;

        const app = await Application.findOneOrFail({
            where: {
                id,
                organization: In(organizations.map(({ id }) => id))
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
