import { InputType, Field } from 'type-graphql';
import { DeploymentStrategy } from '../../entity/Deployment';

@InputType()
export class DeploymentInput {
    @Field()
    image!: string;

    @Field() label!: string;

    @Field(() => DeploymentStrategy)
    strategy!: DeploymentStrategy;
}
