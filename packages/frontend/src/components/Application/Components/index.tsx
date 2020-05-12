import React from 'react';
import List from './List';
import Detail from './Detail';
import { Route, Routes } from 'react-router-dom';
import { Breadcrumb } from '../Breadcrumbs';

export default function Components({ list }: { list?: boolean }) {
    if (list) {
        return (
            <Breadcrumb name="Components" url="components">
                <List />
            </Breadcrumb>
        );
    }

    return (
        <Breadcrumb name="Components" url="components">
            <Routes>
                <Route path=":component">
                    <Detail />
                </Route>
            </Routes>
        </Breadcrumb>
    );
}
