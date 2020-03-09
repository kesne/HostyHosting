import { Form, Modal, Input } from 'antd';
import { useCreateApplicationMutation } from '../../queries';
import { useEffect } from 'react';
import Router from 'next/router';

type Props = {
    visible: boolean;
    onClose(): void;
};

export default function CreateApplication({ visible, onClose }: Props) {
    const [createApplication, { data, loading }] = useCreateApplicationMutation();
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible]);

    useEffect(() => {
        if (data) {
            Router.push(`/applications/${data.createApplication.id}`);
        }
    }, [data]);

    async function handleFinish() {
        const values = await form.validateFields();
        createApplication({
            variables: {
                name: values.name,
                description: values.description
            }
        });
    }

    return (
        <Modal
            title="Create Application"
            visible={visible}
            confirmLoading={loading}
            okText="Create"
            onOk={handleFinish}
            onCancel={onClose}
        >
            <Form form={form} name="create_application" layout="vertical">
                <Form.Item
                    name="name"
                    label="Application Name"
                    rules={[{ required: true, message: 'An application name is required.' }]}
                >
                    <Input disabled={loading} />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea disabled={loading} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
