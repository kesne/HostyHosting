import React from 'react';
import Container from './Container';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../forms/Input';
import { useMutation, graphql } from 'react-relay/hooks';
import { ResetPasswordMutation } from './__generated__/ResetPasswordMutation.graphql';
import SubmitButton from '../forms/SubmitButton';
import Form from '../forms/Form';

export default function Reset() {
    const navigate = useNavigate();
    const params = useParams();

    const [commit, isInFlight] = useMutation<ResetPasswordMutation>(graphql`
        mutation ResetPasswordMutation($uuid: String!, $password: String!) {
            resetPassword(uuid: $uuid, password: $password) {
                ok
            }
        }
    `);

    const onFinish = (values: Record<string, string>) => {
        commit({
            variables: {
                uuid: params.uuid,
                password: values.password,
            },
            onCompleted() {
                navigate('/');
            },
        });
    };

    return (
        <Container title="Finish resetting your password">
            <Form className="space-y-6" onSubmit={onFinish} disabled={isInFlight}>
                <p className="text-sm leading-5 text-gray-700">
                    You can set a new password for your account below, which can be used for all
                    future sign-ins.
                </p>

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    register={{ required: true }}
                    autoFocus
                />

                <SubmitButton fullWidth>Reset Password</SubmitButton>
            </Form>
        </Container>
    );
}
