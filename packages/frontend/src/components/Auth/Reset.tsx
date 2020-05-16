import React from 'react';
import Container from './Container';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useMutation, graphql } from 'react-relay/hooks';
import { ResetPasswordMutation } from './__generated__/ResetPasswordMutation.graphql';

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

    const { register, errors, handleSubmit } = useForm();

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
            <form className="space-y-6" onSubmit={handleSubmit(onFinish)}>
                <p className="text-sm leading-5 text-gray-700">
                    You can set a new password for your account below, which can be used for all
                    future sign-ins.
                </p>

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    ref={register({ required: true })}
                    errors={errors}
                    disabled={isInFlight}
                    autoFocus
                />

                <Button variant="primary" type="submit" disabled={isInFlight} fullWidth>
                    Reset Password
                </Button>
            </form>
        </Container>
    );
}
