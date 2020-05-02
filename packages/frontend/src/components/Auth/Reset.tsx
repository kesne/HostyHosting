import React, { useEffect } from 'react';
import { useResetPasswordMutation } from '../../queries';
import Container from './Container';
import { Navigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function Reset() {
    const { uuid } = useParams<{ uuid: string }>();
    const [resetPassword, { data, loading }] = useResetPasswordMutation();

    const { register, errors, handleSubmit } = useForm();

    useEffect(() => {
        resetPassword();
    }, [resetPassword]);

    const onFinish = (values: Record<string, string>) => {
        resetPassword({
            variables: {
                uuid,
                password: values.password
            }
        });
    };

    if (data) {
        return <Navigate to="/" />;
    }

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
                    autoFocus
                />

                <Button variant="primary" type="submit" disabled={loading} fullWidth>
                    Reset Password
                </Button>
            </form>
        </Container>
    );
}
