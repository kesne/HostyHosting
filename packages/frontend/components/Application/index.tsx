import Router from 'next/router';
import { useApplicationQuery } from '../../queries';
import Settings from './Settings';
import Overview from './Overview';
import ContainerGroups from './ContainerGroups';
import Deployments from './Deployments';
import ApplicationContext, { useApplicationID } from './ApplicationContext';
import TailwindPageHeader from '../ui/PageHeader';
import TailwindTabs from '../ui/Tabs';
import Container from '../ui/Container';
import Spinner from '../Spinner';
import { useEffect } from 'react';

function GoToOverview() {
    const id = useApplicationID();

    useEffect(() => {
        Router.replace(`/applications/${id}`);
    }, []);

    return null;
}

const PAGES: Record<string, React.ComponentType<any>> = {
    overview: Overview,
    deployments: Deployments,
    cgs: ContainerGroups,
    settings: Settings
};

function ApplicationPage({ page }: { page: string }) {
    const Component = PAGES[page] || GoToOverview;
    return <Component />;
}

export default function Application({ id, page = 'overview' }: { id: number; page?: string }) {
    const { data, loading, error } = useApplicationQuery({
        variables: {
            id
        }
    });

    if (loading || error || !data) {
        return <Spinner />;
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
                    onChange={() => console.log('changed')}
                    value={page}
                    tabs={[
                        { label: 'Overview', value: 'overview', href: `/applications/${id}` },
                        {
                            label: 'Deployments',
                            value: 'deployments',
                            href: `/applications/${id}/deployments`
                        },
                        {
                            label: 'Container Groups',
                            value: 'cgs',
                            href: `/applications/${id}/cgs`
                        },
                        {
                            label: 'Settings',
                            value: 'settings',
                            href: `/applications/${id}/settings`
                        }
                    ]}
                />
            </div>

            <Container>
                <ApplicationPage page={page} />
            </Container>
        </ApplicationContext.Provider>
    );
}
