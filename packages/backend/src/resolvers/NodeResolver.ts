import { Resolver, Arg, ID, Query, Ctx } from 'type-graphql';
import { Node } from './types/Node';
import { Organization } from '../entity/Organization';
import { Context } from '../types';

@Resolver()
export class NodeResolver {
    @Query(() => Node, { nullable: true })
    node(@Ctx() { user }: Context, @Arg('id', () => ID) nodeID: string) {
        const [type, id] = nodeID.split(':');

        switch (type) {
            case Organization.name:
                return Organization.findForUser(user, { id });
        }

        return null;
    }

    @Query(() => [Node], { nullable: 'items' })
    nodes(@Arg('ids', () => [ID]) ids: string[]) {
        throw new Error('TODO: Implement this.');
    }
}
