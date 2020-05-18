import React from 'react';
import Checkbox from '../ui/Checkbox';
import Link from '../ui/Link';
import GithubButton from './GithubButton';
import { useMutation, graphql } from 'react-relay/hooks';
import { EmailPasswordMutation } from './__generated__/EmailPasswordMutation.graphql';
import Form from '../forms/Form';
import Input from '../forms/Input';
import SubmitButton from '../forms/SubmitButton';

type Props = {
    onSignIn(): void;
    onRequiresTOTP(): void;
};

export default function EmailPassword({ onSignIn, onRequiresTOTP }: Props) {
    const [commit, isInFlight] = useMutation<EmailPasswordMutation>(graphql`
        mutation EmailPasswordMutation($email: String!, $password: String!) {
            signIn(email: $email, password: $password) {
                ok
                requiresTOTP
            }
        }
    `);

    const onFinish = (values: Record<string, string>) => {
        commit({
            variables: {
                email: values.email,
                password: values.password,
            },
            onCompleted(data) {
                if (data.signIn.requiresTOTP) {
                    onRequiresTOTP();
                } else {
                    onSignIn();
                }
            },
        });
    };

    return (
        <Form className="space-y-6" onSubmit={onFinish} disabled={isInFlight}>
            <Input label="Email address" name="email" register={{ required: true }} autoFocus />
            <Input label="Password" name="password" type="password" register={{ required: true }} />
            <div className="flex items-center justify-between">
                <Checkbox />
                <span className="text-sm leading-5">
                    <Link to="/auth/forgot">Forgot your password?</Link>
                </span>
            </div>
            <SubmitButton fullWidth>Sign In</SubmitButton>
            <GithubButton />
        </Form>
    );
}
