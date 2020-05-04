import { EntityRepository, Repository } from 'typeorm';
import { Component } from '../entity/Component';
import { Application } from '../entity/Application';

@EntityRepository(Component)
export class ComponentRepository extends Repository<Component> {
    findByApplicationAndId(application: Application, id: number) {
        return this.findOneOrFail({
            where: {
                id,
                application,
            },
        });
    }
}
