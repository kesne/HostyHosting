import { Resolver, FieldResolver, Int, Root } from 'type-graphql';
import { ContainerGroup } from '../entity/ContainerGroup';
import Container from './types/Container';
import * as pricing from '../utils/pricing';

@Resolver(() => ContainerGroup)
export class ContainerGroupResolver {
    // TODO: This will eventually be done by querying the Crystal backend, but for now, it's here.
    @FieldResolver(() => [Container])
    containers() {
        return Array.from({ length: 2 }, (_, i) =>
            Object.assign(new Container(), {
                id: i,
                status: 'RUNNING',
            }),
        );
    }

    @FieldResolver(() => Int)
    async monthlyPrice(@Root() containerGroup: ContainerGroup) {
        return pricing.calculateMonthlyCost(containerGroup.size, containerGroup.containerCount);
    }
}
