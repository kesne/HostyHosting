import Relay from 'graphql-relay';
import { ObjectType, Field, ClassType, ID, ArgsType, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';

export type ConnectionCursor = Relay.ConnectionCursor;

export class Cursor {
    static serialize(id: Date) {
        return Buffer.from(id.toString(), 'utf8').toString('base64');
    }

    static parse(cursor: string) {
        return new Date(Buffer.from(cursor, 'base64').toString('utf8'));
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
export class ConnectionArgs implements Relay.ConnectionArguments {
    @Field(() => ID, { nullable: true, description: 'Paginate before opaque cursor' })
    before?: ConnectionCursor;
    @Field(() => ID, { nullable: true, description: 'Paginate after opaque cursor' })
    after?: ConnectionCursor;

    @Min(0)
    @Max(10)
    @Field(() => Int, { nullable: true, description: 'Paginate first' })
    first?: number;

    @Min(0)
    @Max(10)
    @Field(() => Int, { nullable: true, description: 'Paginate last' })
    last?: number;
}

export function createConnection<T extends ClassType>(nodeType: T) {
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

    return [Connection, Edge] as const;
}
