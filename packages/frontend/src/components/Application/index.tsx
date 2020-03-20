import React from 'react';
import { Redirect, useParams, useRouteMatch, Switch, Route } from 'react-router-dom';
import { useApplicationQuery } from '../../queries';
import Settings from './Settings';
import Overview from './Overview';
import ContainerGroups from './ContainerGroups';
import Deployments from './Deployments';
import ApplicationContext from './ApplicationContext';
import TailwindPageHeader from '../ui/PageHeader';
import TailwindTabs from '../ui/Tabs';
import Container from '../ui/Container';
import Spinner from '../Spinner';

export default function Application() {
    const params = useParams<{ id: string }>();
    const id = Number(params.id);

    const { path, url } = useRouteMatch();
    let pageMatch = useRouteMatch<{ page: string }>(`${path}/:page`);

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
                    value={pageMatch ? pageMatch.params.page : 'overview'}
                    tabs={[
                        {
                            label: 'Overview',
                            value: 'overview',
                            to: url
                        },
                        {
                            label: 'Deployments',
                            value: 'deployments',
                            to: `${url}/deployments`
                        },
                        {
                            label: 'Container Groups',
                            value: 'cgs',
                            to: `${url}/cgs`
                        },
                        {
                            label: 'Settings',
                            value: 'settings',
                            to: `${url}/settings`
                        }
                    ]}
                />
            </div>

            <Container>
                <Switch>
                    <Route path={`${path}/deployments`}>
                        <Deployments />
                    </Route>
                    <Route path={`${path}/cgs`}>
                        <ContainerGroups />
                    </Route>
                    <Route path={`${path}/settings`}>
                        <Settings />
                    </Route>
                    <Route path={path} exact>
                        <Overview />
                    </Route>
                    <Redirect to={url} />
                </Switch>
            </Container>
        </ApplicationContext.Provider>
    );
}
