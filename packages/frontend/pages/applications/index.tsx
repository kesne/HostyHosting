import { Button, Form, Input, Typography } from 'antd';
import { useCreateApplicationMutation } from '../../queries';
import { useEffect } from 'react';
import Router from 'next/router';

export default function Applications() {
    const [createApplication, { data, loading }] = useCreateApplicationMutation();

    useEffect(() => {
        if (data) {
            Router.push(`/applications/${data.createApplication.id}`);
        }
    }, [data]);

    async function handleFinish(values: Record<string, string>) {
        console.log('creating...');
        createApplication({
            variables: {
                name: values.name
            }
        });
    }

    return (
        <div>
            <Typography.Title>Create Application</Typography.Title>
            <Form onFinish={handleFinish}>
                <Form.Item name="name" label="Application Name">
                    <Input disabled={loading} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" loading={loading}>
                        Create Application
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
