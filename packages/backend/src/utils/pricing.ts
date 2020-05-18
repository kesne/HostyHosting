import { ContainerSize } from "../entity/ContainerGroup";

const PRICE_PER_BASE_CONTAINER = 250;

const MULTIPLIER = {
    [ContainerSize.S1x1]: 1,
    [ContainerSize.S2x2]: 2,
    [ContainerSize.S4x4]: 4,
    [ContainerSize.S8x8]: 8,
    [ContainerSize.S16x16]: 16,
};

class Pricing {
    calculateMonthlyCost(size: ContainerSize, count: number) {
        return PRICE_PER_BASE_CONTAINER * MULTIPLIER[size] * count;
    }
}

export default new Pricing();
