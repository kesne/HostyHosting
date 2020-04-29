import { InputType, Field, Int } from 'type-graphql';
import { ContainerSize } from '../../entity/ContainerGroup';

@InputType()
export class ContainerGroupInput {
    @Field(() => Int)
    componentID!: number;

    @Field(() => Int)
    environmentID!: number;

    @Field(() => ContainerSize)
    size!: ContainerSize;

    @Field(() => Int)
    containerCount!: number;
}
