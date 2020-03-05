import { Modal, Form, Input } from 'antd';
import { useEffect, useContext } from 'react';
import {
    useCreateDeploymentMutation,
    ApplicationDeploymentsQuery,
    ApplicationDeploymentsDocument
} from '../../../queries';
import ApplicationContext from '../ApplicationContext';
import produce from 'immer';

type Props = {
    visible: boolean;
    onClose(): void;
};

export default function CreateDeployment({ visible, onClose }: Props) {
    const applicationID = useContext(ApplicationContext);
    const [form] = Form.useForm();
    const [createDeployment, { loading, data }] = useCreateDeploymentMutation({
        update(cache, { data }) {
            if (!data) return;

            // Read the data from our cache for this query.
            const { application } =
                cache.readQuery<ApplicationDeploymentsQuery>({
                    query: ApplicationDeploymentsDocument,
                    variables: { id: applicationID }
                }) ?? {};

            const nextApplication = produce(application, (draftState) => {
                draftState?.deployments.push(data.application.createDeployment);
            });

            cache.writeQuery({
                query: ApplicationDeploymentsDocument,
                variables: { id: applicationID },
                data: { application: nextApplication }
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
                applicationID,
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
            <Form form={form} layout="vertical">
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
