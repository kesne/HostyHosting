import { Form, Modal, InputNumber, Button } from 'antd';
import useBoolean from '../../utils/useBoolean';
import { useUpdateContainerMutation } from '../../../queries';
import { useEffect, useContext } from 'react';
import ApplicationContext from '../ApplicationContext';

type Props = {
    id: number;
    currentNumber: number;
};

export default function ScaleContainer({ id, currentNumber }: Props) {
    const applicationID = useContext(ApplicationContext);
    const [form] = Form.useForm();
    const [visible, { on, off }] = useBoolean(false);
    const [updateContainer, { loading }] = useUpdateContainerMutation();

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible]);

    async function handleOk() {
        const values = await form.validateFields();

        if (values.number !== currentNumber) {
            await updateContainer({
                variables: {
                    applicationID,
                    id,
                    number: values.number
                }
            });
        }

        off();
    }

    return (
        <>
            <Button size="small" onClick={on}>
                Scale Container
            </Button>
            <Modal
                title="Scale Container"
                visible={visible}
                onCancel={off}
                onOk={handleOk}
                confirmLoading={loading}
            >
                <Form form={form} layout="vertical" initialValues={{ number: currentNumber }}>
                    <Form.Item
                        name="number"
                        label="Number of Containers"
                        rules={[
                            { required: true, message: 'You must deploy at least 1 container.' }
                        ]}
                    >
                        <InputNumber min={1} max={10} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
