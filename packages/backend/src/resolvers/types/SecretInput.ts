import { Field, InputType } from 'type-graphql';

@InputType()
export class SecretInput {
    @Field()
    key!: string;

    @Field()
    value!: string;
}
