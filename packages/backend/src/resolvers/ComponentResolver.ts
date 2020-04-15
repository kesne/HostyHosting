import { Resolver, FieldResolver, Int, Root } from "type-graphql";
import { Component } from "../entity/Component";
import * as pricing from "../utils/pricing";

@Resolver(() => Component)
export class ComponentResolver {
    @FieldResolver(() => Int)
    async monthlyPrice(@Root() component: Component) {
        const containerGroup = await component.containerGroup;
        return pricing.calculateMonthlyCost(containerGroup.size, containerGroup.containerCount);
    }
}
