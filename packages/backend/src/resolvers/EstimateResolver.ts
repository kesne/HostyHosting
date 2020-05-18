import { Query, Resolver, Arg, Int } from 'type-graphql';
import { ContainerSize } from '../entity/ContainerGroup';
import pricing from '../utils/pricing';

@Resolver()
export class EstimateResolver {
    @Query(() => Int)
    estimateMonthlyPrice(
        @Arg('size', () => ContainerSize) size: ContainerSize,
        @Arg('count', () => Int) count: number,
    ) {
        return pricing.calculateMonthlyCost(size, count);
    }
}
