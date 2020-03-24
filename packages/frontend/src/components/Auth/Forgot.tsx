import React from 'react';
import { useForgotPasswordMutation } from '../../queries';
import Container from '../../components/Auth/Container';
import Link from '@daas/ui/Link';
import { useForm } from 'react-hook-form';
import Input from '@daas/ui/Input';
import Button from '@daas/ui/Button';

export default function Forgot() {
    const [forgotPassword, { data, loading }] = useForgotPasswordMutation();
    const { register, errors, handleSubmit } = useForm();

    const onFinish = (values: Record<string, any>) => {
        forgotPassword({
            variables: {
                email: values.email
            }
        });
    };

    return (
        <Container
            title="Forgot password"
            subtitle={
                <span>
                    Remembered your password?{' '}
                    <Link to="/auth/sign-in">Sign in to your account</Link>
                </span>
            }
        >
            {data ? (
                <p className="text-sm leading-5 text-gray-700">
                    A confirmation has been sent to your email. Click the link in the email to
                    finish resetting your password
                </p>
            ) : (
                <form className="grid grid-cols-1 row-gap-6" onSubmit={handleSubmit(onFinish)}>
                    <p className="text-sm leading-5 text-gray-700">
                        Enter the email you created your account with, and we will email you a link
                        to reset your password.
                    </p>

                    <Input
                        label="Email"
                        name="email"
                        errors={errors}
                        ref={register({ required: true })}
                        autoFocus
                    />

                    <Button variant="primary" type="submit" disabled={loading} fullWidth>
                        Email Recovery Link
                    </Button>
                </form>
            )}
        </Container>
    );
}
