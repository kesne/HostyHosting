import React from 'react';
import List from './List';
import Detail from './Detail';
import { Route, Routes } from 'react-router-dom';
import { Crumb } from '../../Crumbs';

export default function Components({ list }: { list?: boolean }) {
    if (list) {
        return (
            <Crumb name="Components" url="components">
                <List />
            </Crumb>
        );
    }

    return (
        <Crumb name="Components" url="components">
            <Routes>
                <Route path=":component">
                    <Detail />
                </Route>
            </Routes>
        </Crumb>
    );
}
