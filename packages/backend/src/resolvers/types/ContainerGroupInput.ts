import { InputType, Field, Int } from 'type-graphql';
import { ContainerSize } from '../../entity/ContainerGroup';

@InputType()
export class ContainerGroupInput {
    @Field()
    label!: string;

    @Field(() => Int)
    deploymentID!: number;

    @Field(() => ContainerSize)
    size!: ContainerSize;

    @Field(() => Int)
    number!: number;
}
