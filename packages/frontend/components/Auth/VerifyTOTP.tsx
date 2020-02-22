import { useEffect } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useExchangeTotpMutation } from '../../queries';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};

type Props = {
    onSignIn(): void;
};

export default function VerifyTOTP({ onSignIn }: Props) {
    const [exchangeTotp, { data, loading }] = useExchangeTotpMutation();

    useEffect(() => {
        if (data) {
            onSignIn();
        }
    }, [data, onSignIn]);

    function handleFinish(values: Record<string, any>) {
        exchangeTotp({
            variables: {
                token: values.token
            }
        });
    }

    return (
        <Form {...layout} name="verify-totp" onFinish={handleFinish}>
            <Typography.Paragraph>
                Two factor auth is enabled on this account. Please enter the token from your
                authenticator app below:
            </Typography.Paragraph>

            <Form.Item
                label="Token"
                name="token"
                rules={[{ required: true, message: 'Please enter the two factor auth token.' }]}
            >
                <Input pattern="[0-9]{6}" maxLength={6} autoFocus />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" disabled={loading}>
                    Verify Two Factor Auth
                </Button>
            </Form.Item>
        </Form>
    );
}
