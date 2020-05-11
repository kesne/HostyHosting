import { Resolver, FieldResolver, Root, Authorized, Query, Ctx, Arg, Int, ID } from 'type-graphql';
import { Application } from '../entity/Application';
import { Context } from '../types';
import { Component } from '../entity/Component';
import { Environment } from '../entity/Environment';
import { getCustomRepository, getRepository } from 'typeorm';
import { ApplicationRepository } from '../repositories/ApplicationRepository';

@Resolver(() => Application)
export class ApplicationResolver {
    constructor(
        private applicationRepo = getCustomRepository(ApplicationRepository),
        private componentRepo = getRepository(Component),
    ) {}

    @Authorized()
    @Query(() => Application)
    async application(@Ctx() { user }: Context, @Arg('id', () => ID) id: string) {
        return await this.applicationRepo.findForUserByID(user, id);
    }

    @FieldResolver(() => Component)
    async component(@Root() application: Application, @Arg('id', () => ID) id: string) {
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
