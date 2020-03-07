import { ObjectType, Field } from 'type-graphql';

@ObjectType({ description: 'Provides a boolean to determine if the action was successful or not.' })
export default class Result {
    @Field()
    ok: boolean;

    constructor(ok: boolean = true) {
        this.ok = ok;
    }
}
