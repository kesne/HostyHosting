import { InterfaceType, Field, ID, FieldResolver, Root, Resolver, ClassType } from 'type-graphql';

@InterfaceType()
export abstract class Node {
    @Field(() => ID)
    id!: string;
}

export function createNodeResolvable<T extends ClassType>(type: T) {
    @Resolver(() => type, { isAbstract: true })
    abstract class NodeResolvable {
        @FieldResolver(() => ID)
        id(@Root() node: Node) {
            return `${type.name}:${node.id}`;
        }
    }

    return NodeResolvable;
}
