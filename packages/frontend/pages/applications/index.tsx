import { useState } from 'react';
import { Button, PageHeader, List } from 'antd';
import Link from 'next/link';
import CreateApplication from '../../components/Applications/CreateApplication';
import { useApplicationsQuery } from '../../queries';

export default function Applications() {
    const { data, loading } = useApplicationsQuery();
    const [visible, setVisible] = useState();

    return (
        <div>
            <PageHeader
                ghost={false}
                title="Applications"
                extra={[
                    <Button key="new" type="primary" onClick={() => setVisible(true)}>
                        New
                    </Button>
                ]}
            >
                <List
                    size="large"
                    dataSource={data?.applications}
                    loading={loading}
                    renderItem={item => (
                        <Link href="/applications/[id]" as={`/applications/${item.id}`}>
                            <a>
                                <List.Item>{item.name}</List.Item>
                            </a>
                        </Link>
                    )}
                />
            </PageHeader>
            <CreateApplication visible={visible} onClose={() => setVisible(false)} />

            {/* <Form onFinish={handleFinish}>
                <Form.Item name="name" label="Application Name">
                    <Input disabled={loading} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" loading={loading}>
                        Create Application
                    </Button>
                </Form.Item>
            </Form> */}
        </div>
    );
}
