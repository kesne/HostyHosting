import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card, { CardContent } from '../ui/Card';
import { useLazyLoadQuery, graphql, useMutation } from 'react-relay/hooks';
import { EditAccountQuery } from './__generated__/EditAccountQuery.graphql';
import { EditAccountMutation } from './__generated__/EditAccountMutation.graphql';

export default function EditAccount() {
    const [commit, isInFlight] = useMutation<EditAccountMutation>(graphql`
        mutation EditAccountMutation($username: String!, $name: String!, $email: String!) {
            updateAccount(username: $username, name: $name, email: $email) {
                id
                username
                name
                email
            }
        }
    `);

    const data = useLazyLoadQuery<EditAccountQuery>(
        graphql`
            query EditAccountQuery {
                me {
                    id
                    username
                    name
                    email
                }
            }
        `,
        {},
    );

    const { register, errors, handleSubmit } = useForm();

    function handleFinish(values: Record<string, any>) {
        commit({
            variables: {
                username: values.username,
                name: values.name,
                email: values.email,
            },
        });
    }

    return (
        <Card>
            <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit(handleFinish)}>
                    <Input
                        label="Username"
                        name="username"
                        disabled={isInFlight}
                        defaultValue={data.me.username}
                        ref={register({ required: true })}
                        errors={errors}
                    />
                    <Input
                        label="Name"
                        name="name"
                        disabled={isInFlight}
                        defaultValue={data?.me.name}
                        ref={register({ required: true })}
                        errors={errors}
                    />
                    <Input
                        label="Email"
                        name="email"
                        disabled={isInFlight}
                        defaultValue={data?.me.email}
                        ref={register({ required: true })}
                        errors={errors}
                    />

                    <div>
                        <Button disabled={isInFlight} variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
