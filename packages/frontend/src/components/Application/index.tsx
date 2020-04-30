import React from 'react';
import { Redirect, useParams, useRouteMatch, Switch, Route } from 'react-router-dom';
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

export default function Application() {
    const params = useParams<{ application: string }>();
    const id = Number(params.application);

    const { path, url } = useRouteMatch();
    let pageMatch = useRouteMatch<{ page: string }>(`${path}/:page`);

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
                    <div className="my-6">
                        <Tabs
                            value={pageMatch ? pageMatch.params.page : 'overview'}
                            tabs={[
                                {
                                    label: 'Overview',
                                    value: 'overview',
                                    to: url,
                                },
                                {
                                    label: 'Components',
                                    value: 'components',
                                    to: `${url}/components`,
                                },
                                {
                                    label: 'Settings',
                                    value: 'settings',
                                    to: `${url}/settings`,
                                },
                            ]}
                        />
                    </div>
                    <Switch>
                        <Route path={`${path}/components`}>
                            <Components />
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
        </BreadcrumbProvider>
    );
}
