import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Link from '../ui/Link';
import GithubButton from './GithubButton';
import { useMutation, graphql } from 'react-relay/hooks';
import { EmailPasswordMutation } from './__generated__/EmailPasswordMutation.graphql';

type Props = {
    onSignIn(): void;
    onRequiresTOTP(): void;
};

export default function EmailPassword({ onSignIn, onRequiresTOTP }: Props) {
    const { register, errors, handleSubmit } = useForm();

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
        <form className="space-y-6" onSubmit={handleSubmit(onFinish)}>
            <Input
                label="Email address"
                name="email"
                ref={register({ required: true })}
                errors={errors}
                disabled={isInFlight}
                autoFocus
            />
            <Input
                label="Password"
                name="password"
                type="password"
                errors={errors}
                ref={register({ required: true })}
                disabled={isInFlight}
            />
            <div className="flex items-center justify-between">
                <Checkbox />
                <span className="text-sm leading-5">
                    <Link to="/auth/forgot">Forgot your password?</Link>
                </span>
            </div>
            <Button type="submit" variant="primary" disabled={isInFlight} fullWidth>
                Sign In
            </Button>
            <GithubButton />
        </form>
    );
}
