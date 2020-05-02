import React from 'react';
import List from './List';
import Detail from './Detail';
import { Route, useLocation, Routes } from 'react-router-dom';
import { useBreadcrumb } from '../Breadcrumbs';

export default function Components() {
    const { pathname } = useLocation();

    useBreadcrumb({
        name: 'Components',
        url: pathname,
    });

    return (
        <Routes>
            <Route path=":component">
                <Detail />
            </Route>
            <Route path="*">
                <List />
            </Route>
        </Routes>
    );
}
