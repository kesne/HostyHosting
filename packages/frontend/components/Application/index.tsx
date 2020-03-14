import Router from 'next/router';
import { Spin, PageHeader, Tag, Button, Descriptions, Tabs } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useApplicationQuery } from '../../queries';
import Settings from './Settings';
import Overview from './Overview';
import ContainerGroups from './ContainerGroups';
import Deployments from './Deployments';
import ApplicationContext from './ApplicationContext';
import TailwindPageHeader from '../ui/PageHeader';
import TailwindTabs from '../ui/Tabs';
import Container from '../ui/Container';
import Card from '../ui/Card';

function formatDate(timestamp: string) {
    return new Date(timestamp).toDateString();
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
        <ApplicationContext.Provider value={id}>
            <TailwindPageHeader>
                <h4 className="text-lg leading-6 font-semibold text-gray-900">
                    {data.application.name}
                </h4>
            </TailwindPageHeader>

            <div className="flex justify-center py-4">
                <TailwindTabs
                    pills
                    secondary
                    value="overview"
                    tabs={[
                        { label: 'Overview', value: 'overview' },
                        { label: 'Deployments', value: 'deployments' },
                        { label: 'Container Groups', value: 'cgs' },
                        { label: 'Settings', value: 'settings' }
                    ]}
                />
            </div>

            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card
                        header={
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Details</h3>
                        }
                    >
                        <div className="px-4 py-5 sm:p-0">
                            <dl>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                    <dt className="text-sm leading-5 font-medium text-gray-500">
                                        Full name
                                    </dt>
                                    <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        Margot Foster
                                    </dd>
                                </div>
                                <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                                    <dt className="text-sm leading-5 font-medium text-gray-500">
                                        Application for
                                    </dt>
                                    <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        Backend Developer
                                    </dd>
                                </div>
                                <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                                    <dt className="text-sm leading-5 font-medium text-gray-500">
                                        Email address
                                    </dt>
                                    <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        margotfoster@example.com
                                    </dd>
                                </div>
                                <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                                    <dt className="text-sm leading-5 font-medium text-gray-500">
                                        Salary expectation
                                    </dt>
                                    <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        $120,000
                                    </dd>
                                </div>
                                <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                                    <dt className="text-sm leading-5 font-medium text-gray-500">
                                        About
                                    </dt>
                                    <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                                        incididunt cillum culpa consequat. Excepteur qui ipsum
                                        aliquip consequat sint. Sit id mollit nulla mollit nostrud
                                        in ea officia proident. Irure nostrud pariatur mollit ad
                                        adipisicing reprehenderit deserunt qui eu.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </Card>
                    <Card
                        header={
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Deployment History
                            </h3>
                        }
                    >
                        TODO
                    </Card>
                    <Card
                        header={
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Containers
                            </h3>
                        }
                    >
                        TODO
                    </Card>
                </div>
            </Container>

            <PageHeader
                ghost={false}
                title={data.application.name}
                subTitle={data.application.description}
                onBack={() => Router.back()}
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
                <Tabs defaultActiveKey="overview" size="large">
                    <Tabs.TabPane tab="Overview" key="overview">
                        <Overview />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Deployments" key="deploy">
                        <Deployments />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Container Groups" key="containergroups">
                        <ContainerGroups />
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
        </ApplicationContext.Provider>
    );
}
