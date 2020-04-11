import React from 'react';
import List from './List';
import Detail from './Detail';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { useBreadcrumb } from '../Breadcrumbs';

export default function Components() {
    const { path, url } = useRouteMatch();

    useBreadcrumb({
        name: 'Components',
        url: url,
    });

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
