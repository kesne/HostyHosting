import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from './Container';
import Link from '../ui/Link';
import GithubButton from './GithubButton';
import { useMutation, graphql } from 'react-relay/hooks';
import { SignUpMutation } from './__generated__/SignUpMutation.graphql';
import Form from '../forms/Form';
import Input from '../forms/Input';
import SubmitButton from '../forms/SubmitButton';

export default function SignUp() {
    const navigate = useNavigate();

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
            <Form className="space-y-6" onSubmit={onFinish} disabled={isInFlight}>
                <Input label="Username" name="username" register={{ required: true }} autoFocus />
                <Input label="Name" name="name" register={{ required: true }} />
                <Input label="Email" name="email" register={{ required: true }} />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    register={{ required: true }}
                />

                <SubmitButton fullWidth>Sign Up</SubmitButton>
                <GithubButton />
            </Form>
        </Container>
    );
}
