import React from 'react';
import List from './List';
import Detail from './Detail';
import { Route, Routes } from 'react-router-dom';
import { useBreadcrumb } from '../Breadcrumbs';

export default function Components({ list }: { list?: boolean }) {
    useBreadcrumb({
        name: 'Components',
        url: 'components',
    });

    if (list) {
        return <List />;
    }

    return (
        <Routes>
            <Route path=":component">
                <Detail />
            </Route>
        </Routes>
    );
}
