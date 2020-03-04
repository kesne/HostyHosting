import { Modal, Form, Input } from 'antd';
import { useEffect } from 'react';
import {
    useCreateDeploymentMutation,
    ApplicationDocument,
    ApplicationQuery
} from '../../../queries';

type Props = {
    id: number;
    visible: boolean;
    onClose(): void;
};

export default function CreateDeployment({ id, visible, onClose }: Props) {
    const [form] = Form.useForm();
    const [createDeployment, { loading, data }] = useCreateDeploymentMutation({
        update(cache, { data }) {
            if (!data) return;

            // Read the data from our cache for this query.
            const { application } =
                cache.readQuery<ApplicationQuery>({
                    query: ApplicationDocument,
                    variables: { id }
                }) ?? {};

            application?.deployments.push(data.application.createDeployment);

            cache.writeQuery({
                query: ApplicationDocument,
                variables: { id },
                data: application
            });
        }
    });

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible]);

    useEffect(() => {
        if (data) {
            onClose();
        }
    }, [data]);

    async function handleOk() {
        const values = await form.validateFields();
        await createDeployment({
            variables: {
                applicationID: id,
                image: values.image
            }
        });
    }

    return (
        <Modal
            visible={visible}
            title="Create Deployment"
            onOk={handleOk}
            okText="Create"
            onCancel={onClose}
            confirmLoading={loading}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="image"
                    label="Image Name"
                    rules={[{ required: true, message: 'You must specify an image name.' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}
