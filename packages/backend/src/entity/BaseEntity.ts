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
    FindConditions,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Cursor, ConnectionArgs } from '../resolvers/types/Pagination';

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
        args: ConnectionArgs,
    ) {
        if (typeof partialOptions.where !== 'object') {
            throw new Error('Where must be an object');
        }

        if (args.before || args.last) {
            throw new Error('Backwards pagination is not yet supported.');
        }

        if (!args.first) {
            throw new Error(
                'Must specify the number of records to fetch via the `first` argument.',
            );
        }

        // NOTE: I use any here because I am lazy:
        const where: any = {
            ...partialOptions.where,
        };

        if (args.after) {
            const after = Cursor.parse(args.after);
            where.createdAt = LessThan(after);
        }

        const records = await this.find<T>({
            ...partialOptions,
            where,
            order: {
                ...partialOptions.order,
                createdAt: 'DESC',
            },
            // NOTE: We need to load one extra record to see if there's a next page or not.
            take: args.first + 1,
        });

        const hasNextPage = records.length > args.first;

        return {
            pageInfo: {
                hasNextPage,
                hasPreviousPage: false,
                startCursor: records.length ? Cursor.serialize(records[0].createdAt) : null,
                endCursor: records.length
                    ? Cursor.serialize(
                          records[Math.max(records.length - (hasNextPage ? 2 : 1), 0)].createdAt,
                      )
                    : null,
            },
            edges: records.slice(0, args.first).map(node => ({
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
