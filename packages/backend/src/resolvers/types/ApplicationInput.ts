import { InputType, Field } from 'type-graphql';

@InputType()
export class ApplicationInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;
}
