import { useEffect } from 'react';
import { Modal, Form, Input, Typography } from 'antd';
import { useDisableTotpMutation } from '../../queries';

type Props = {
    visible: boolean
    onClose(): void;
};

export default function DisableTOTP({ visible, onClose }: Props) {
    const [form] = Form.useForm();
    const [disableTOTP, { data, loading }] = useDisableTotpMutation();

    useEffect(() => {
        if (data) {
            onClose();
        }
    }, [data, onClose]);

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible])

    async function handleOk() {
        const values = await form.validateFields();

        await disableTOTP({
            variables: {
                password: values.password
            }
        });
    }

    return (
        <Modal
            title="Disable Two Factor Auth"
            visible={visible}
            onCancel={onClose}
            onOk={handleOk}
            confirmLoading={loading}
        >
            <Typography.Paragraph>Please enter your password to disable two-factor authentication on your account.</Typography.Paragraph>
            <Form form={form} layout="vertical" name="disable-totp">
                <Form.Item label="Password" name="password">
                    <Input type="password" size="large" placeholder="Password..." required autoFocus />
                </Form.Item>
            </Form>
        </Modal>
    );
}
