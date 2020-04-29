import React from 'react';
import { Redirect } from 'react-router-dom';
import Container from './Container';
import { useSignUpMutation } from '../../queries';
import Link from '../ui/Link';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import GithubButton from './GithubButton';

export default function SignUp() {
    const [signUp, { data, loading }] = useSignUpMutation();
    const { register, errors, handleSubmit } = useForm();

    const onFinish = (values: Record<string, string>) => {
        signUp({
            variables: {
                username: values.username,
                name: values.name,
                email: values.email,
                password: values.password,
            },
        });
    };

    if (data) {
        return <Redirect to="/" />;
    }

    return (
        <Container
            title="Create a new account"
            subtitle={
                <span>
                    Or <Link to="/auth/sign-in">sign in to your existing account.</Link>
                </span>
            }
        >
            <form className="space-y-6" onSubmit={handleSubmit(onFinish)}>
                <Input
                    label="Username"
                    name="username"
                    errors={errors}
                    ref={register({ required: true })}
                    autoFocus
                />
                <Input
                    label="Name"
                    name="name"
                    errors={errors}
                    ref={register({ required: true })}
                />

                <Input
                    label="Email"
                    name="email"
                    errors={errors}
                    ref={register({ required: true })}
                />

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    errors={errors}
                    ref={register({ required: true })}
                />

                <Button variant="primary" type="submit" disabled={loading} fullWidth>
                    Sign Up
                </Button>
                <GithubButton />
            </form>
        </Container>
    );
}
