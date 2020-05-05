import React from 'react';
import { useParams, Routes, Route, Outlet, useMatch } from 'react-router-dom';
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
    // TODO: This is a _horrible_ way to do this because we're calling a hook in a function (BAD)
    // Instead, we really should make `<Tabs />` with a href location-aware so that we can just
    // have the hooks called in the individual <Tab /> components.
    const value =
        LAYOUT_TABS.map(({ value, to }) => ({ match: useMatch(to), value })).find(
            ({ match }) => match,
        )?.value ?? 'overview';

    const currentPage = useMatch(':page');
    console.log(currentPage);

    return (
        <>
            <div className="my-6">
                <Tabs
                    // TODO: This value needs to be dynamic:
                    value={value}
                    tabs={[
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
                    ]}
                />
            </div>
            <Outlet />
        </>
    );
}

export default function Application() {
    const params = useParams<{ application: string }>();
    const id = Number(params.application);

    const { data, loading, error } = useApplicationQuery({
        variables: {
            id,
        },
    });

    if (loading || error || !data) {
        return <Spinner />;
    }

    return (
        <BreadcrumbProvider
            root={[
                { name: data.application.name, url: `/applications/${params.application}` },
                {
                    name: data.application.organization.name,
                    url: `/orgs/${data.application.organization.id}`,
                },
            ]}
        >
            <ApplicationContext.Provider value={id}>
                <PageHeader>
                    <Breadcrumbs />
                </PageHeader>

                <Container>
                    <Routes>
                        {/* <Route path="/" element={<Navigate to="overview" replace />} />} */}
                        <Route path="/" element={<ApplicationLayout />}>
                            {/*
                                TODO: This is a bug with React Router 6 that requires us to have a path named "overview" here:
                                https://github.com/ReactTraining/react-router/issues/7239
                            */}
                            <Route path="/" element={<Overview />} />
                            <Route path="components" element={<Components />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                        <Route path="components/*" element={<Components />} />
                    </Routes>
                </Container>
            </ApplicationContext.Provider>
        </BreadcrumbProvider>
    );
}
