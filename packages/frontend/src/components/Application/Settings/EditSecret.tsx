import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { useUpdateApplicationMutation, Secret } from '../../../queries';

type Props = {
    id: number;
    secret: Secret | null;
    onClose(): void;
};

export default function EditSecret({ id, secret, onClose }: Props) {
    const [form] = Form.useForm();
    const [updateApplication, { loading }] = useUpdateApplicationMutation();

    useEffect(() => {
        form.resetFields();
    }, [secret]);

    async function handleSubmit() {
        const values = await form.validateFields();
        await updateApplication({
            variables: {
                id,
                secret: {
                    key: values.key,
                    value: values.value
                }
            }
        });

        onClose();
    }

    return (
        <Modal
            title="Edit Secret"
            visible={!!secret}
            onCancel={onClose}
            onOk={handleSubmit}
            confirmLoading={loading}
            okText="Save"
        >
            <Form
                layout="vertical"
                form={form}
                initialValues={{ key: secret?.key ?? '', value: secret?.value ?? '' }}
            >
                <Form.Item label="KEY" name="key">
                    <Input disabled={loading} />
                </Form.Item>
                <Form.Item label="VALUE" name="value">
                    <Input disabled={loading} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
