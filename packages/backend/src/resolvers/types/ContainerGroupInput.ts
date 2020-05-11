import { InputType, Field, Int, ID } from 'type-graphql';
import { ContainerSize } from '../../entity/ContainerGroup';

@InputType()
export class ContainerGroupInput {
    @Field(() => ID)
    componentID!: string;

    @Field(() => ID)
    environmentID!: string;

    @Field(() => ContainerSize)
    size!: ContainerSize;

    @Field(() => Int)
    containerCount!: number;
}
