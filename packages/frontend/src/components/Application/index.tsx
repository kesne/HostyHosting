import React, { useMemo } from 'react';
import {
    useParams,
    Routes,
    Route,
    Outlet,
    useMatch,
    useResolvedLocation,
    useLocation,
} from 'react-router-dom';
import { useApplicationQuery } from '../../queries';
import Settings from './Settings';
import Overview from './Overview';
import Components from './Components';
import ApplicationContext from './ApplicationContext';
import PageHeader from '../ui/PageHeader';
import Tabs from '../ui/Tabs';
import Container from '../ui/Container';
import Spinner from '../Spinner';
import Breadcrumbs, { Provider as BreadcrumbProvider } from './Breadcrumbs';

const LAYOUT_TABS = [
    {
        label: 'Overview',
        value: 'overview',
        to: 'overview',
    },
    {
        label: 'Components',
        value: 'components',
        to: `components`,
    },
    {
        label: 'Settings',
        value: 'settings',
        to: `settings`,
    },
];

function ApplicationLayout() {
    const { pathname } = useResolvedLocation('.');
    const pageMatch = useMatch(`${pathname}/:page`);

    return (
        <>
            <div className="my-6">
                <Tabs
                    value={pageMatch ? pageMatch.params.page : 'overview'}
                    tabs={[
                        {
                            label: 'Overview',
                            value: 'overview',
                            to: '.',
                        },
                        {
                            label: 'Components',
                            value: 'components',
                            to: `components`,
                        },
                        {
                            label: 'Settings',
                            value: 'settings',
                            to: `settings`,
                        },
                    ]}
                />
            </div>
            <Outlet />
        </>
    );
}

export default function Application() {
    const params = useParams();

    const { data, loading, error } = useApplicationQuery({
        variables: {
            organization: params.organization,
            application: params.application,
        },
    });

    const applicationContext = useMemo(
        () => ({
            application: data?.organization.application.id ?? '',
        }),
        [data?.organization.application.id],
    );

    if (loading || error || !data) {
        return <Spinner />;
    }

    const { organization } = data;
    const { application } = organization;

    return (
        <BreadcrumbProvider
            root={[
                {
                    name: application.name,
                    url: '.',
                },
                {
                    name: organization.name,
                    url: '../..',
                },
            ]}
        >
            <ApplicationContext.Provider value={applicationContext}>
                <PageHeader>
                    <Breadcrumbs />
                </PageHeader>

                <Container>
                    <Routes>
                        <Route path="/" element={<ApplicationLayout />}>
                            <Route path="/" element={<Overview />} />
                            <Route path="components" element={<Components list />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                        <Route path="components/*" element={<Components />} />
                    </Routes>
                </Container>
            </ApplicationContext.Provider>
        </BreadcrumbProvider>
    );
}
