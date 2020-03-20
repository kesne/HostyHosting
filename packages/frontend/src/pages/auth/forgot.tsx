import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, Input, Button, Form } from 'antd';
import { useForgotPasswordMutation } from '../../queries';
import Spacing from '../../components/Spacing';
import Container from '../../components/Auth/Container';
import { CheckCircleTwoTone } from '@ant-design/icons';

const RightAlign = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Complete = styled.div`
    margin: 32px;
    display: flex;
    justify-content: center;
`;

export default function Forgot() {
    const [forgotPassword, { data, loading }] = useForgotPasswordMutation();

    const onFinish = (values: Record<string, any>) => {
        forgotPassword({
            variables: {
                email: values.email
            }
        });
    };

    return (
        <Container title="Forgot password">
            {data ? (
                <>
                    <Typography.Paragraph>
                        A confirmation has been sent to your email. Click the link in the email to
                        finish resetting your password
                    </Typography.Paragraph>
                    <Complete>
                        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 64 }} />
                    </Complete>
                </>
            ) : (
                <>
                    <Typography.Paragraph>
                        Enter the email you created your account with, and we will email you a link
                        to reset your password.
                    </Typography.Paragraph>
                    <Spacing top={2}>
                        <Form name="login" onFinish={onFinish} layout="vertical" hideRequiredMark>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input autoFocus />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" disabled={loading}>
                                    Email Recovery Link
                                </Button>
                            </Form.Item>
                        </Form>
                    </Spacing>
                    <Spacing top={3}>
                        <RightAlign>
                            <Link to="/auth/sign-in">Remembered your password? Sign in</Link>
                        </RightAlign>
                    </Spacing>
                </>
            )}
        </Container>
    );
}

export default withNoAuth(Forgot);
