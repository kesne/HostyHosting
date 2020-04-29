import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSignInMutation } from '../../queries';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Link from '../ui/Link';
import GithubButton from './GithubButton';

type Props = {
    onSignIn(): void;
    onRequiresTOTP(): void;
};

export default function EmailPassword({ onSignIn, onRequiresTOTP }: Props) {
    const { register, errors, handleSubmit } = useForm();
    const [signIn, { data, loading }] = useSignInMutation();

    useEffect(() => {
        if (data) {
            if (data.signIn.requiresTOTP) {
                onRequiresTOTP();
            } else {
                onSignIn();
            }
        }
    }, [data, onSignIn, onRequiresTOTP]);

    const onFinish = (values: Record<string, string>) => {
        signIn({
            variables: {
                email: values.email,
                password: values.password,
            },
        });
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onFinish)}>
            <Input
                label="Email address"
                name="email"
                ref={register({ required: true })}
                autoFocus
            />
            <Input
                label="Password"
                name="password"
                type="password"
                ref={register({ required: true })}
            />
            <div className="flex items-center justify-between">
                <Checkbox />
                <span className="text-sm leading-5">
                    <Link to="/auth/forgot">Forgot your password?</Link>
                </span>
            </div>
            <Button type="submit" variant="primary" disabled={loading} fullWidth>
                Sign In
            </Button>
            <GithubButton />
        </form>
    );
}
