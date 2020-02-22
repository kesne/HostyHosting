import { useEffect } from 'react';
import styled from 'styled-components';
import { Modal, InputNumber, Form, Typography, Skeleton, Alert } from 'antd';
import { useOnboardTotpLazyQuery, useEnableTotpMutation } from '../../queries';

type Props = {
    visible: boolean;
    onClose(): void;
};

const Code = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const QRCode = styled.img`
    display: block;
    margin: 16px auto;
`;

export default function OnboardTOTP({ visible, onClose }: Props) {
    const [form] = Form.useForm();
    const [fetchOnboardTOTP, { data, error, loading }] = useOnboardTotpLazyQuery({
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true
    });

    const [enableTotp, totpEnableState] = useEnableTotpMutation();

    useEffect(() => {
        if (visible) {
            form.resetFields();
            fetchOnboardTOTP();
        }
    }, [visible]);

    async function handleOk() {
        const values = await form.validateFields();

        await enableTotp({
            variables: {
                token: String(values.token),
                secret: data?.me.onboardTOTP?.secret ?? ''
            }
        });
    }

    useEffect(() => {
        if (totpEnableState.data) {
            onClose();
        }
    }, [totpEnableState.data, onClose]);

    const OTP_DATA = data
        ? `otpauth://totp/${data.me.name}?secret=${data.me.onboardTOTP?.secret}`
        : '';

    return (
        <Modal
            visible={visible}
            title="Two Factor Auth Setup"
            onCancel={onClose}
            onOk={handleOk}
            confirmLoading={totpEnableState.loading}
        >
            {loading ? (
                <Skeleton />
            ) : !data || error ? (
                <Alert
                    message="Sorry we couldn't enable two-factor authentication"
                    description="Please try again later"
                    type="error"
                />
            ) : (
                <Form form={form} layout="vertical" name="totp">
                    <Typography.Paragraph>
                        Scan this QR code in an authenticator app to enable Two Factor
                        Authentication. This will require you to enter a pin from the authenticator
                        app every time you sign in.
                    </Typography.Paragraph>
                    <QRCode
                        alt="Enable Two Factor Authentication"
                        src={`https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${OTP_DATA}`}
                    />
                    <Typography.Paragraph>
                        Or enter it manually:
                        <br />
                        <Code>
                            <Typography.Title level={3} code>
                                {data.me.onboardTOTP?.secret}
                            </Typography.Title>
                        </Code>
                    </Typography.Paragraph>
                    <Form.Item label="Token" name="token">
                        <InputNumber
                            size="large"
                            placeholder="6 digit code..."
                            maxLength={6}
                            pattern="[0-9]{6}"
                            required
                            autoFocus
                        />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
}
