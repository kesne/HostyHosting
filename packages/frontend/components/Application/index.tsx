import Router from 'next/router';
import { Spin, PageHeader, Tag, Button, Descriptions, Tabs } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useApplicationQuery } from '../../queries';
import Settings from './Settings';

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
                        {data.application.createdAt}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Updated">
                        {data.application.updatedAt}
                    </Descriptions.Item>
                </Descriptions>
                <Tabs defaultActiveKey="overview" size="large">
                    <Tabs.TabPane tab="Overview" key="overview">
                        Overview
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
                        <Settings />
                    </Tabs.TabPane>
                </Tabs>
            </PageHeader>
        </>
    );
}
