import Router from 'next/router';
import { Spin, PageHeader, Tag, Button, Descriptions, Tabs } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useApplicationQuery } from '../../queries';
import Settings from './Settings';
import Overview from './Overview';

// TODO: We really can return this as a number instead of a string.
function formatDate(timestamp: string) {
    return new Date(+timestamp).toDateString();
}

export default function Application({ id }: { id: number }) {
    const { data, loading, error } = useApplicationQuery({
        variables: {
            id
        }
    });

    if (loading || error || !data) {
        return <Spin />;
    }

    return (
        <>
            <PageHeader
                ghost={false}
                title={data.application.name}
                subTitle={data.application.description}
                onBack={() => Router.push('/applications')}
                tags={<Tag color="blue">Running</Tag>}
                extra={[
                    <Button key="delete" type="danger">
                        Delete
                    </Button>
                ]}
            >
                <Descriptions size="small" column={3}>
                    {data.application.createdBy && (
                        <Descriptions.Item label="Created By">
                            <a>{data.application.createdBy.name}</a>
                        </Descriptions.Item>
                    )}
                    <Descriptions.Item label="Created At">
                        {formatDate(data.application.createdAt)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Updated">
                        {formatDate(data.application.updatedAt)}
                    </Descriptions.Item>
                </Descriptions>
                <Tabs defaultActiveKey="settings" size="large">
                    <Tabs.TabPane tab="Overview" key="overview">
                        <Overview />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Containers" key="containers">
                        Containers
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Deploy" key="deploy">
                        Deploy
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={
                            <span>
                                <SettingOutlined />
                                Settings
                            </span>
                        }
                        key="settings"
                    >
                        <Settings application={data.application} />
                    </Tabs.TabPane>
                </Tabs>
            </PageHeader>
        </>
    );
}
