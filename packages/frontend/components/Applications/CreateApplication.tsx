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
                name: values.name
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
                <Form.Item name="name" label="Application Name">
                    <Input disabled={loading} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
