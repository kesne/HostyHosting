import React, { useEffect } from 'react';
import { Form, Modal, Input } from 'antd';
import { useCreateApplicationMutation } from '../../queries';
import { Redirect } from 'react-router-dom';

type Props = {
    organization?: number
    visible: boolean;
    onClose(): void;
};

export default function CreateApplication({ organization, visible, onClose }: Props) {
    const [createApplication, { data, loading }] = useCreateApplicationMutation();
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible]);

    async function handleFinish() {
        const values = await form.validateFields();
        createApplication({
            variables: {
                org: organization,
                name: values.name,
                description: values.description
            }
        });
    }

    if (data) {
        return <Redirect to={`/applications/${data.organization.createApplication.id}`} />
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
