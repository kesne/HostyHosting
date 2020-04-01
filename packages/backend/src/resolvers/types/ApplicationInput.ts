import { InputType, Field } from 'type-graphql';
import { SecretInput } from './Secret';

@InputType()
export class ApplicationInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    secret?: SecretInput;
}
