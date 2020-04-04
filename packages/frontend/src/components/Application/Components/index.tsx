import React from 'react';
import List from './List';
import Detail from './Detail';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

export default function Components() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/:component`}>
                <Detail />
            </Route>
            <Route>
                <List />
            </Route>
        </Switch>
    );
}
