import { Button, Input, Form, PageHeader, Alert } from 'antd';
import { useUpdateAccountMutation, useMeQuery } from '../../queries';
import Spinner from '../Spinner';

export default function EditAccount() {
    const { data, loading, error } = useMeQuery();
    const [updateAccount, updateAccountState] = useUpdateAccountMutation();

    function handleFinish(values: Record<string, any>) {
        updateAccount({
            variables: {
                name: values.name,
                email: values.email
            }
        });
    }

    return (
        <PageHeader title="Your Account" ghost={false}>
            {loading ? (
                <Spinner />
            ) : !data || error ? (
                <Alert
                    message="Sorry we couldn't load your account."
                    description={
                        error ? error.message : 'An unknown error occurred. Please try again later.'
                    }
                    type="error"
                />
            ) : (
                <Form
                    initialValues={{
                        name: data.me.name,
                        email: data.me.email
                    }}
                    onFinish={handleFinish}
                >
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Name" disabled={updateAccountState.loading} />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Email" disabled={updateAccountState.loading} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            disabled={updateAccountState.loading}
                            type="primary"
                            htmlType="submit"
                        >
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </PageHeader>
    );
}
