import { InputType, Field, Int } from 'type-graphql';
import { DeploymentStrategy } from '../../entity/Component';
import { ContainerSize } from '../../entity/ContainerGroup';

// TODO: We should probably optionally type all of these and assert for creation.
@InputType()
export class ComponentInput {
    @Field({ nullable: true })
    image!: string;

    @Field({ nullable: true})
    name!: string;

    @Field(() => DeploymentStrategy, { nullable: true })
    deploymentStrategy!: DeploymentStrategy;

    @Field(() => ContainerSize, { nullable: true })
    size!: ContainerSize;

    @Field(() => Int, { nullable: true })
    containerCount!: number;

    @Field(() => Int, { nullable: true })
    environmentID!: number;
}
