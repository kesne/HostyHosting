import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export default class Container {
    @Field(() => Int)
    id!: number;

    @Field()
    status!: string;
}
