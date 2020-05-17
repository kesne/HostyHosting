import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from './Container';
import Link from '../ui/Link';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import GithubButton from './GithubButton';
import { useMutation, graphql } from 'react-relay/hooks';
import { SignUpMutation } from './__generated__/SignUpMutation.graphql';

export default function SignUp() {
    const navigate = useNavigate();
    const { register, errors, handleSubmit } = useForm();

    const [commit, isInFlight] = useMutation<SignUpMutation>(graphql`
        mutation SignUpMutation(
            $username: String!
            $name: String!
            $email: String!
            $password: String!
        ) {
            signUp(username: $username, name: $name, email: $email, password: $password) {
                ok
            }
        }
    `);

    const onFinish = (values: Record<string, string>) => {
        commit({
            variables: {
                username: values.username,
                name: values.name,
                email: values.email,
                password: values.password,
            },
            onCompleted() {
                navigate('/');
            },
        });
    };

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
                    disabled={isInFlight}
                    autoFocus
                />
                <Input
                    label="Name"
                    name="name"
                    errors={errors}
                    ref={register({ required: true })}
                    disabled={isInFlight}
                />

                <Input
                    label="Email"
                    name="email"
                    errors={errors}
                    ref={register({ required: true })}
                    disabled={isInFlight}
                />

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    errors={errors}
                    ref={register({ required: true })}
                    disabled={isInFlight}
                />

                <Button variant="primary" type="submit" disabled={isInFlight} fullWidth>
                    Sign Up
                </Button>
                <GithubButton />
            </form>
        </Container>
    );
}
