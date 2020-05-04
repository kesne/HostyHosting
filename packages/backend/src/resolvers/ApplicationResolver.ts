import { Resolver, FieldResolver, Root, Authorized, Query, Ctx, Arg, Int } from 'type-graphql';
import { Application } from '../entity/Application';
import { Context } from '../types';
import { Component } from '../entity/Component';
import { Environment } from '../entity/Environment';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

@Resolver(() => Application)
export class ApplicationResolver {
    @InjectRepository(Application)
    applicationRepo!: Repository<Application>;

    @InjectRepository(Component)
    componentRepo!: Repository<Component>;

    @Authorized()
    @Query(() => Application)
    async application(@Ctx() { user }: Context, @Arg('id', () => Int) id: number) {
        const app = await this.applicationRepo.findOneOrFail({
            where: {
                id,
            },
        });

        // Verify that the current user has permission to this app:
        app.userHasPermission(user);

        return app;
    }

    @FieldResolver(() => Component)
    async component(@Root() application: Application, @Arg('id', () => Int) id: number) {
        return await this.componentRepo.findOneOrFail({
            where: {
                id,
                application,
            },
        });
    }

    @FieldResolver(() => [Environment])
    async environments(@Root() application: Application) {
        const organization = await application.organization;
        return organization.environments;
    }
}
