import React, { useState } from 'react';
import Container from '../../components/Auth/Container';
import Link from '../ui/Link';
import { useMutation, graphql } from 'react-relay/hooks';
import { ForgotPasswordMutation } from './__generated__/ForgotPasswordMutation.graphql';
import Input from '../forms/Input';
import Form from '../forms/Form';
import SubmitButton from '../forms/SubmitButton';

export default function Forgot() {
    const [submitted, setSubmitted] = useState(false);

    const [commit, isInFlight] = useMutation<ForgotPasswordMutation>(graphql`
        mutation ForgotPasswordMutation($email: String!) {
            forgotPassword(email: $email) {
                ok
            }
        }
    `);

    const onFinish = (values: Record<string, any>) => {
        commit({
            variables: {
                email: values.email,
            },
            onCompleted() {
                setSubmitted(true);
            },
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
            {submitted ? (
                <p className="text-sm leading-5 text-gray-700">
                    A confirmation has been sent to your email. Click the link in the email to
                    finish resetting your password
                </p>
            ) : (
                <Form className="space-y-6" onSubmit={onFinish} disabled={isInFlight}>
                    <p className="text-sm leading-5 text-gray-700">
                        Enter the email you created your account with, and we will email you a link
                        to reset your password.
                    </p>

                    <Input label="Email" name="email" autoFocus />

                    <SubmitButton fullWidth>Email Recovery Link</SubmitButton>
                </Form>
            )}
        </Container>
    );
}
