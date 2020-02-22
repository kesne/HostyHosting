import { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Button, Input } from 'antd';
import { withNoAuth } from '../../components/utils/auth';
import Spacing from '../../components/Spacing';
import Container from '../../components/Auth/Container';
import { useSignUpMutation } from '../../queries';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};

const LinkContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

function SignUp() {
    const [signUp, { data, loading }] = useSignUpMutation();

    useEffect(() => {
        if (data) {
            Router.push('/account');
        }
    }, [data]);

    const onFinish = (values: Record<string, string>) => {
        signUp({
            variables: {
                orgName: values.orgName,
                name: values.name,
                email: values.email,
                password: values.password
            }
        });
    };

    return (
        <Container title="Sign up">
            <Form name="signup" onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="Organization Name"
                    name="orgName"
                    rules={[{ required: true, message: 'Please input an organization name!' }]}
                >
                    <Input autoFocus />
                </Form.Item>
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
                        <Link href="/auth/sign-in">
                            <a>Already have an account? Sign in</a>
                        </Link>
                    </LinkContainer>
                </Spacing>
            </Form>
        </Container>
    );
}

export default withNoAuth(SignUp);
