import React, { useMemo, Suspense } from 'react';
import { useParams, Routes, Route, Outlet, useMatch, useResolvedLocation } from 'react-router-dom';
import Settings from './Settings';
import Overview from './Overview';
import Components from './Components';
import ApplicationContext from './ApplicationContext';
import PageHeader from '../ui/PageHeader';
import Tabs from '../ui/Tabs';
import Container from '../ui/Container';
import { Header, Crumb, CrumbSubtitle } from '../Crumbs';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { ApplicationQuery } from './__generated__/ApplicationQuery.graphql';
import Loader from './Loader';
import Badge from '../ui/Badge';

function ApplicationLayout({ name }: { name: string }) {
    const { pathname } = useResolvedLocation('.');
    const pageMatch = useMatch(`${pathname}/:page`);

    return (
        <>
            <CrumbSubtitle>
                <Badge label={name} />
            </CrumbSubtitle>
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
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </>
    );
}

export default function Application() {
    const params = useParams();

    const data = useLazyLoadQuery<ApplicationQuery>(
        graphql`
            query ApplicationQuery($organization: String!, $application: String!) {
                organization(username: $organization) {
                    id
                    name
                    application(name: $application) {
                        id
                        name
                        label
                    }
                }
            }
        `,
        {
            organization: params.organization,
            application: params.application,
        },
    );

    const applicationContext = useMemo(
        () => ({
            application: data.organization.application.id,
        }),
        [data.organization.application.id],
    );

    const { organization } = data;
    const { application } = organization;

    return (
        <ApplicationContext.Provider value={applicationContext}>
            <Crumb name={organization.name} url="../..">
                <Crumb name={application.label} url=".">
                    <PageHeader>
                        <Header />
                    </PageHeader>

                    <Container>
                        <Routes>
                            <Route path="/" element={<ApplicationLayout name={application.name} />}>
                                <Route path="/" element={<Overview />} />
                                <Route path="components" element={<Components list />} />
                                <Route path="settings" element={<Settings />} />
                            </Route>
                            <Route path="components/*" element={<Components />} />
                        </Routes>
                    </Container>
                </Crumb>
            </Crumb>
        </ApplicationContext.Provider>
    );
}
