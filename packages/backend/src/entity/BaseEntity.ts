import Relay from 'graphql-relay';
import { validateOrReject } from 'class-validator';
import {
    BeforeInsert,
    BeforeUpdate,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    FindManyOptions,
    LessThan,
    MoreThan,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Cursor, ConnectionArgs, LimitOffsetArgs } from '../resolvers/types/Pagination';

/**
 * An entity that is never exposed externally.
 */
export abstract class InternalEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    readonly id!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}

/**
 * An entity that IS exposed via GraphQL.
 */
@ObjectType()
export abstract class ExternalEntity extends BaseEntity {
    static async findAndPaginate<T extends ExternalEntity = ExternalEntity>(
        partialOptions: FindManyOptions<T>,
        args: LimitOffsetArgs,
    ) {
        if (typeof partialOptions.where !== 'object') {
            throw new Error('Where must be an object');
        }

        // NOTE: I use any here because I am lazy:
        const where: any = {
            ...partialOptions.where,
        };

        const records = await this.find<T>({
            ...partialOptions,
            where,
            order: {
                ...partialOptions.order,
                createdAt: 'DESC',
                id: 'DESC',
            },
            // NOTE: We need to load one extra record to see if there's a next page or not.
            take: args.limit + 1,
            skip: args.offset,
        });

        const hasNextPage = records.length > args.limit;

        return {
            pageInfo: {
                hasNextPage,
                hasPreviousPage: !!args.offset,
                startCursor: null,
                endCursor: null,
            },
            edges: records.slice(0, args.limit).map(node => ({
                node,
                cursor: Cursor.serialize(node.createdAt),
            })),
        } as Relay.Connection<T>;
    }

    // TODO: This has a bug where the last-based pagination fails, and loads with the flipped hasNext/hasPrevious page, and the wrong data.
    // I suspect this is because the list is sorted the opposite direction we expect, so it may be as simple as reversing the list,
    // and then flipping the conditions for hasNext/hasPrevious based on first/last pagination.
    static async findAndPaginateConnection<T extends ExternalEntity = ExternalEntity>(
        partialOptions: FindManyOptions<T>,
        args: ConnectionArgs,
    ) {
        if (typeof partialOptions.where !== 'object') {
            throw new Error('Where must be an object');
        }

        if (typeof args.first !== 'number' && typeof args.last !== 'number') {
            throw new Error(
                'Must specify the number of records to fetch via the `first` or `last` argument.',
            );
        }

        const numberOfRecords = args.first ?? args.last ?? 0;

        // NOTE: I use any here because I am lazy:
        const where: any = {
            ...partialOptions.where,
        };

        if (args.after) {
            const after = Cursor.parse(args.after);
            where.createdAt = LessThan(after);
        } else if (args.before) {
            const before = Cursor.parse(args.before);
            where.createdAt = MoreThan(before);
            console.log(before);
        }

        const records = await this.find<T>({
            ...partialOptions,
            where,
            order: {
                ...partialOptions.order,
                createdAt: args.first ? 'DESC' : 'ASC',
            },
            // NOTE: We need to load one extra record to see if there's a next page or not.
            take: numberOfRecords + 1,
        });

        console.log(records);

        const hasNextPage = records.length > numberOfRecords;

        return {
            pageInfo: {
                hasNextPage,
                hasPreviousPage: !!args.after,
                startCursor: records.length ? Cursor.serialize(records[0].createdAt) : null,
                endCursor: records.length
                    ? Cursor.serialize(
                          records[Math.max(records.length - (hasNextPage ? 2 : 1), 0)].createdAt,
                      )
                    : null,
            },
            edges: records.slice(0, numberOfRecords).map(node => ({
                node,
                cursor: Cursor.serialize(node.createdAt),
            })),
        } as Relay.Connection<T>;
    }

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    readonly id!: string;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}
