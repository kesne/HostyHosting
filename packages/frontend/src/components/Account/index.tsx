import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import Security from './Security';
import EditAccount from './EditAccount';
import VerticalNav, { VerticalNavItem } from '@daas/ui/VerticalNav';
import Card, { CardContent } from '@daas/ui/Card';
import Container from '@daas/ui/Container';
import APIKeys from './APIKeys';

export default function Account() {
    const { path, url } = useRouteMatch();
    const { url: fullURL } = useRouteMatch(`${path}/:page?`)!;

    return (
        <Container>
            <div className="flex flex-col sm:flex-row mt-6">
                <div className="sm:w-64">
                    <VerticalNav value={fullURL}>
                        <VerticalNavItem to={path} label="Account" />
                        <VerticalNavItem to={`${path}/security`} label="Security" />
                        <VerticalNavItem to={`${path}/organizations`} label="Organizations" />
                        <VerticalNavItem to={`${path}/billing`} label="Billing" />
                        <VerticalNavItem to={`${path}/apikeys`} label="API Keys" />
                    </VerticalNav>
                </div>
                <div className="flex-1 mt-4 sm:ml-6 sm:mt-0">
                    <Card>
                        <CardContent>
                            <Switch>
                                <Route path={`${path}/billing`}>billing</Route>
                                <Route path={`${path}/organizations`}>orgs</Route>
                                <Route path={`${path}/apikeys`}>
                                    <APIKeys />
                                </Route>
                                <Route path={`${path}/security`}>
                                    <Security />
                                </Route>
                                <Route path={path} exact>
                                    <EditAccount />
                                </Route>
                                <Redirect to={url} />
                            </Switch>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Container>
    );
}
