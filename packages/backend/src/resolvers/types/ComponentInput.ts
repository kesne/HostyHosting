import { InputType, Field } from 'type-graphql';
import { DeploymentStrategy } from '../../entity/Component';

// TODO: We should probably optionally type all of these and assert for creation.
@InputType()
export class ComponentInput {
    @Field({ nullable: true })
    image!: string;

    @Field({ nullable: true})
    name!: string;

    @Field(() => DeploymentStrategy, { nullable: true })
    deploymentStrategy!: DeploymentStrategy;
}
