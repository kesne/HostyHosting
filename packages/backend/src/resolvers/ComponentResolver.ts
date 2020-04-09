import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Component } from '../entity/Component';
import { Secret } from './types/Secret';

@Resolver(() => Component)
export class ComponentResolver {
    @FieldResolver(() => [Secret])
    secrets(@Root() component: Component): Secret[] {
        if (!component.secrets) {
            return [];
        }

        return Object.entries(component.secrets).map(([key, value]) => ({ key, value }));
    }
}
