import { Resolver, Field, ID, InputType, Arg, Mutation } from 'type-graphql';
import { Secret } from '../entity/Secret';

@InputType()
class CreateSecretInput {
    @Field(() => ID)
    containerGroupID!: string;
    @Field()
    key!: string;
    @Field()
    value!: string;
}

@InputType()
class UpdateSecretInput {
    @Field(() => ID)
    secretID!: string;
    @Field()
    key!: string;
    @Field()
    value!: string;
}

@InputType()
class DeleteSecretInput {
    @Field(() => ID)
    secretID!: string;
}

// TODO: This entire resolver needs security help.
@Resolver(() => Secret)
export class SecretResolver {
    @Mutation(() => Secret)
    async createSecret(@Arg('input') input: CreateSecretInput) {
        const secret = Secret.create({
            key: input.key,
            value: input.value,
            containerGroup: {
                id: input.containerGroupID,
            },
        });

        return await secret.save();
    }

    @Mutation(() => Secret)
    async updateSecret(
        @Arg('input') input: UpdateSecretInput,
    ) {
        const secret = await Secret.findOneOrFail(input.secretID);

        secret.key = input.key;
        secret.value = input.value;

        return await secret.save();
    }

    @Mutation(() => Secret)
    async deleteSecret(@Arg('input') input: DeleteSecretInput) {
        const secret = await Secret.findOneOrFail(input.secretID);

        await Secret.delete(secret.id);

        return secret;
    }
}
