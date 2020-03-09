import { Modal, Typography, Button, Form, Input } from 'antd';
import useBoolean from '../../utils/useBoolean';
import { useState, useEffect } from 'react';
import { Application, useDeleteApplicationMutation } from '../../../queries';
import Router from 'next/router';

export type Props = {
    application: Pick<Application, 'id' | 'name'>;
};

export default function Delete({ application }: Props) {
    const [name, setName] = useState('');
    const [visible, { on, off }] = useBoolean(false);
    const [deleteApplication, { loading, data }] = useDeleteApplicationMutation({
        variables: {
            id: application.id
        }
    });

    useEffect(() => {
        if (data) {
            Router.push('/applications');
        }
    }, [data]);

    function handleDelete() {
        deleteApplication();
    }

    return (
        <>
            <Button type="danger" onClick={on}>
                Delete Application
            </Button>
            <Typography.Paragraph>Deleting the application can not be undone.</Typography.Paragraph>
            <Modal
                visible={visible}
                onOk={handleDelete}
                onCancel={off}
                title="Delete Application"
                confirmLoading={loading}
                okButtonProps={{
                    disabled: loading || name !== application.name
                }}
            >
                <Typography.Paragraph>
                    Are you sure that you want to delete this application? All associated routes,
                    deployments, and containers in the application will be immediately stopped. This
                    can not be undone.
                </Typography.Paragraph>

                <Typography.Paragraph>
                    To confirm you wish to delete this application, please enter the full{' '}
                    <b>Application Name</b> below.
                </Typography.Paragraph>

                <Form layout="vertical">
                    <Form.Item label="Application Name" name="name">
                        <Input value={name} onChange={e => setName(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
