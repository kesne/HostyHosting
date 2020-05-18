import React from 'react';
import Card, { CardContent } from '../ui/Card';
import { useLazyLoadQuery, graphql, useMutation } from 'react-relay/hooks';
import { EditAccountQuery } from './__generated__/EditAccountQuery.graphql';
import { EditAccountMutation } from './__generated__/EditAccountMutation.graphql';
import Form from '../forms/Form';
import SubmitButton from '../forms/SubmitButton';
import Input from '../forms/Input';

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
                viewer {
                    id
                    username
                    name
                    email
                }
            }
        `,
        {},
    );

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
                <Form className="space-y-6" onSubmit={handleFinish} disabled={isInFlight}>
                    <Input
                        label="Username"
                        name="username"
                        defaultValue={data.viewer.username}
                        register={{ required: true }}
                    />
                    <Input
                        label="Name"
                        name="name"
                        defaultValue={data.viewer.name}
                        register={{ required: true }}
                    />
                    <Input
                        label="Email"
                        name="email"
                        defaultValue={data.viewer.email}
                        register={{ required: true }}
                    />

                    <div>
                        <SubmitButton>Save Changes</SubmitButton>
                    </div>
                </Form>
            </CardContent>
        </Card>
    );
}
