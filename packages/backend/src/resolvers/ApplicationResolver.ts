import { Resolver, FieldResolver, Root, Authorized, Query, Ctx, Arg, Int } from 'type-graphql';
import { Application } from '../entity/Application';
import { Context } from '../types';
import { Component } from '../entity/Component';
import { Environment } from '../entity/Environment';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { ApplicationRepository } from '../repositories/ApplicationRepository';

@Resolver(() => Application)
export class ApplicationResolver {
    @InjectRepository()
    applicationRepo!: ApplicationRepository;

    @InjectRepository(Component)
    componentRepo!: Repository<Component>;

    @Authorized()
    @Query(() => Application)
    async application(@Ctx() { user }: Context, @Arg('id', () => Int) id: number) {
        return await this.applicationRepo.findForUser(user, id);
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
