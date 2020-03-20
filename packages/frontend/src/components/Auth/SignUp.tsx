import React from 'react';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button, Input } from 'antd';
import Spacing from '../../components/Spacing';
import Container from '../../components/Auth/Container';
import { useSignUpMutation } from '../../queries';

const LinkContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export default function SignUp() {
    const [signUp, { data, loading }] = useSignUpMutation();

    const onFinish = (values: Record<string, string>) => {
        signUp({
            variables: {
                name: values.name,
                email: values.email,
                password: values.password
            }
        });
    };

    if (data) {
        return <Redirect to="/account" />;
    }

    return (
        <Container title="Sign up">
            <Form name="signup" onFinish={onFinish} layout="vertical" hideRequiredMark>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input autoFocus />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={loading}>
                        Sign Up
                    </Button>
                </Form.Item>
                <Spacing top={3}>
                    <LinkContainer>
                        <Link to="/auth/sign-in">Already have an account? Sign in</Link>
                    </LinkContainer>
                </Spacing>
            </Form>
        </Container>
    );
}
