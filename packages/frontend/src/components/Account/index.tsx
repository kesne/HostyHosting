import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import Container from './Container';
import Security from './Security';
import EditAccount from './EditAccount';

export default function Account() {
    const { path, url } = useRouteMatch();

    return (
        <Container>
            <Switch>
                <Route path={`${path}/billing`}>billing</Route>
                <Route path={`${path}/organizations`}>orgs</Route>
                <Route path={`${path}/security`}>
                    <Security />
                </Route>
                <Route path={path} exact>
                    <EditAccount />
                </Route>
                <Redirect to={url} />
            </Switch>
        </Container>
    );
}
