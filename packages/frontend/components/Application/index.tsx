import Router from 'next/router';
import { Spin, PageHeader, Tag, Button, Descriptions, Tabs } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useApplicationQuery } from '../../queries';
import Settings from './Settings';
import Overview from './Overview';
import Containers from './Containers';
import Deployments from './Deployments';

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
                extra={[<Button key="delete">More</Button>]}
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
                <Tabs defaultActiveKey="containers" size="large">
                    <Tabs.TabPane tab="Overview" key="overview">
                        <Overview />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Deployments" key="deploy">
                        <Deployments application={data.application} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Containers" key="containers">
                        <Containers application={data.application} />
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
