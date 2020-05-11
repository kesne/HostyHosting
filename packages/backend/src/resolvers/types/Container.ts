import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default class Container {
    @Field(() => ID)
    id!: string;

    @Field()
    status!: string;
}
