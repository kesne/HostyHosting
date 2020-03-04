import { Modal, Form, InputNumber, Slider, Typography } from 'antd';
import { useEffect } from 'react';
import {
    useCreateContainerMutation,
    ApplicationDocument,
    ApplicationQuery
} from '../../../queries';

type Props = {
    id: number;
    visible: boolean;
    onClose(): void;
};

export default function CreateContainer({ id, visible, onClose }: Props) {
    const [form] = Form.useForm();
    const [createContainer, { loading, data }] = useCreateContainerMutation({
        update(cache, { data }) {
            if (!data) return;

            // Read the data from our cache for this query.
            const { application } =
                cache.readQuery<ApplicationQuery>({
                    query: ApplicationDocument,
                    variables: { id }
                }) ?? {};

            application?.containers.push(data.application.createContainer);

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
        await createContainer({
            variables: {
                applicationID: id,
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
