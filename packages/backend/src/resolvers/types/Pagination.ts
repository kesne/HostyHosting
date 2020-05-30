import Relay from 'graphql-relay';
import { ObjectType, Field, ClassType, ID, ArgsType, Int, Args } from 'type-graphql';
import { Min, Max } from 'class-validator';

export type ConnectionCursor = Relay.ConnectionCursor;

const MAX_RESULTS = 20;

export class Cursor {
    static serialize(id: Date) {
        return Buffer.from(String(id.getTime())).toString('base64');
    }

    static parse(cursor: string) {
        return new Date(+Buffer.from(cursor, 'base64'));
    }
}

@ObjectType()
export class PageInfo implements Relay.PageInfo {
    @Field()
    hasNextPage!: boolean;
    @Field()
    hasPreviousPage!: boolean;
    @Field(() => ID, { nullable: true })
    startCursor?: ConnectionCursor;
    @Field(() => ID, { nullable: true })
    endCursor?: ConnectionCursor;
}

@ArgsType()
export class LimitOffsetArgs {
    @Min(1)
    @Max(MAX_RESULTS)
    @Field(() => Int)
    limit!: number;

    @Field(() => Int, { nullable: true })
    offset?: number;
}

@ArgsType()
export class ConnectionArgs implements Relay.ConnectionArguments {
    @Field(() => ID, { nullable: true, description: 'Paginate before opaque cursor' })
    before?: ConnectionCursor;
    @Field(() => ID, { nullable: true, description: 'Paginate after opaque cursor' })
    after?: ConnectionCursor;

    @Min(1)
    @Max(MAX_RESULTS)
    @Field(() => Int, { nullable: true, description: 'Paginate first' })
    first?: number;

    @Min(1)
    @Max(MAX_RESULTS)
    @Field(() => Int, { nullable: true, description: 'Paginate last' })
    last?: number;
}

const CONNECTIONS_CACHE = new Map();

export function createConnection<T extends ClassType>(nodeType: T) {
    if (CONNECTIONS_CACHE.has(nodeType)) {
        return CONNECTIONS_CACHE.get(nodeType);
    }

    @ObjectType(`${nodeType.name}Edge`)
    class Edge implements Relay.Edge<T> {
        @Field(() => nodeType)
        node!: T;

        @Field(() => ID, { description: 'Used in `before` and `after` args' })
        cursor!: ConnectionCursor;
    }

    @ObjectType(`${nodeType.name}Connection`)
    class Connection implements Relay.Connection<T> {
        @Field()
        pageInfo!: PageInfo;

        @Field(() => [Edge])
        edges!: Edge[];
    }

    const returnValue = [Connection, Edge] as const;

    CONNECTIONS_CACHE.set(nodeType, returnValue);

    return returnValue;
}
