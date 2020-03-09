import { Modal, Form, Input, InputNumber, Slider, Typography, Select } from 'antd';
import { useEffect, useContext } from 'react';
import {
    useCreateContainerGroupMutation,
    ApplicationContainerGroupsDocument,
    ApplicationContainerGroupsQuery,
    useApplicationDeploymentsQuery
} from '../../../queries';
import ApplicationContext from '../ApplicationContext';
import produce from 'immer';

type Props = {
    visible: boolean;
    onClose(): void;
};

export default function CreateContainer({ visible, onClose }: Props) {
    const applicationID = useContext(ApplicationContext);
    const [form] = Form.useForm();

    const deploymentsState = useApplicationDeploymentsQuery({
        variables: {
            id: applicationID
        }
    });

    const [createContainerGroup, { loading, data }] = useCreateContainerGroupMutation({
        update(cache, { data }) {
            if (!data) return;

            // Read the data from our cache for this query.
            const { application } =
                cache.readQuery<ApplicationContainerGroupsQuery>({
                    query: ApplicationContainerGroupsDocument,
                    variables: { id: applicationID }
                }) ?? {};

            const nextApplication = produce(application, draftState => {
                draftState?.containerGroups.push(data.application.createContainerGroup);
            });

            cache.writeQuery({
                query: ApplicationContainerGroupsDocument,
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
        await createContainerGroup({
            variables: {
                applicationID,
                label: values.label,
                deployment: values.deployment,
                size: values.size,
                number: values.number
            }
        });
    }

    return (
        <Modal
            visible={visible}
            title="Create Container"
            onOk={handleOk}
            okText="Create"
            onCancel={onClose}
            confirmLoading={loading}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    size: 1,
                    number: 1
                }}
            >
                <Typography.Paragraph>
                    Select the size of the container, and the number of containers that you would
                    like to deploy. The size of the container can{' '}
                    <Typography.Text strong>not</Typography.Text> be changed after it is created.
                    The number of deployments can be changed at any time.
                </Typography.Paragraph>
                <Form.Item
                    name="label"
                    label="Label"
                    rules={[
                        {
                            required: true,
                            message: 'A label is required to create a container.'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="deployment"
                    label="Deployment"
                    rules={[
                        {
                            required: true,
                            message: 'A deployment is required to create a container.'
                        }
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Select a deployment"
                        optionFilterProp="children"
                        loading={deploymentsState.loading}
                        disabled={deploymentsState.loading}
                    >
                        {deploymentsState.data?.application.deployments.map(deployment => (
                            <Select.Option key={deployment.id} value={deployment.id}>
                                {deployment.image}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="size" label="Container Size">
                    <Slider
                        defaultValue={1}
                        min={1}
                        max={5}
                        tooltipVisible={false}
                        tooltipPlacement="bottom"
                        marks={{
                            1: '1x',
                            2: '2x',
                            3: '3x',
                            4: '4x',
                            5: '5x'
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="number"
                    label="Number of Containers"
                    rules={[{ required: true, message: 'You must deploy at least 1 container.' }]}
                >
                    <InputNumber min={1} max={10} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
