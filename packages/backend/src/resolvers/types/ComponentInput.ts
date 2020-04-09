import { InputType, Field, Int } from 'type-graphql';
import { DeploymentStrategy } from '../../entity/Component';
import { ContainerSize } from '../../entity/ContainerGroup';

@InputType()
export class ComponentInput {
    @Field()
    image!: string;

    @Field()
    name!: string;

    @Field(() => DeploymentStrategy)
    deploymentStrategy!: DeploymentStrategy;

    @Field(() => ContainerSize)
    size!: ContainerSize;

    @Field(() => Int)
    containerCount!: number;

    @Field(() => Int)
    environmentID!: number;
}
