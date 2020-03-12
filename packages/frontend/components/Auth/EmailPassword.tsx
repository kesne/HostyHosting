import { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import Spacing from '../Spacing';
import Row from '../Row';
import { useSignInMutation } from '../../queries';

type Props = {
    onSignIn(): void;
    onRequiresTOTP(): void;
};

export default function EmailPassword({ onSignIn, onRequiresTOTP }: Props) {
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
                password: values.password
            }
        });
    };

    return (
        <>
            <Form name="login" onFinish={onFinish} layout="vertical" hideRequiredMark>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input autoFocus />
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
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
            <Spacing top={3}>
                <Row
                    after={
                        <Link href="/auth/sign-up">
                            <a>Don't have an account? Sign Up</a>
                        </Link>
                    }
                >
                    <Link href="/auth/forgot">
                        <a>Forgot password?</a>
                    </Link>
                </Row>
            </Spacing>
        </>
    );
}
