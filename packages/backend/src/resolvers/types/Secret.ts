import { Field, ObjectType, InputType } from 'type-graphql';

@InputType()
export class SecretInput {
    @Field()
    key!: string;

    @Field()
    value!: string;
}

@ObjectType()
export class Secret {
    @Field()
    key!: string;

    @Field()
    value!: string;
}
