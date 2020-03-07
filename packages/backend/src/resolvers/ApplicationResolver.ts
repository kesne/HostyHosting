import {
    Query,
    Resolver,
    Ctx,
    Arg,
    Int,
    FieldResolver,
    Root,
    Authorized,
    Mutation
} from 'type-graphql';
import { Application } from '../entity/Application';
import { Context } from '../types';
import { Secret } from './types/Secret';

@Resolver(() => Application)
export class ApplicationResolver {
    @Authorized()
    @Mutation(() => Application)
    async createApplication(@Ctx() { organization, user }: Context, @Arg('name') name: string) {
        const app = new Application();
        app.name = name;
        app.organization = Promise.resolve(organization);
        app.createdBy = Promise.resolve(user);
        app.secrets = {};
        return await app.save();
    }

    @Authorized()
    @Query(() => [Application])
    async applications(@Ctx() { organization }: Context) {
        const applications = await Application.find({
            where: {
                organization
            }
        });

        return applications;
    }

    @Authorized()
    @Query(() => Application)
    async application(@Ctx() { organization }: Context, @Arg('id', () => Int) id: number) {
        const app = await Application.findOneOrFail({
            where: {
                id,
                organization
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
