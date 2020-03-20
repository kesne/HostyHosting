import React, { useEffect } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { useResetPasswordMutation } from '../../queries';
import Container from './Container';
import { Redirect, useParams } from 'react-router-dom';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};

export default function Reset() {
    const { uuid } = useParams<{ uuid: string }>();
    const [resetPassword, { data, loading }] = useResetPasswordMutation();

    useEffect(() => {
        resetPassword();
    }, [resetPassword]);

    const onFinish = (values: Record<string, string>) => {
        resetPassword({
            variables: {
                uuid,
                password: values.password
            }
        });
    };

    if (data) {
        return <Redirect to="/" />;
    }

    return (
        <Container title="Password Reset">
            <Typography.Paragraph>
                You can set a new password for your account below, which can be used for all future
                sign-ins.
            </Typography.Paragraph>

            <Form {...layout} name="login" onFinish={onFinish}>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password autoFocus />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" disabled={loading}>
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        </Container>
    );
}
