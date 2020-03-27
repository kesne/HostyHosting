import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Forgot from './Forgot';
import Reset from './Reset';
import GrantAPIKey from './GrantAPIKey';
import GitHubCallback from './GitHubCallback';

export default function Auth() {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/sign-in`}>
                <SignIn />
            </Route>
            <Route path={`${path}/sign-up`}>
                <SignUp />
            </Route>
            <Route path={`${path}/forgot`}>
                <Forgot />
            </Route>
            <Route path={`${path}/reset/:uuid`}>
                <Reset />
            </Route>
            <Route path={`${path}/github/callback`}>
                <GitHubCallback />
            </Route>
            <Redirect to={`${path}/sign-in`} />
        </Switch>
    );
}
