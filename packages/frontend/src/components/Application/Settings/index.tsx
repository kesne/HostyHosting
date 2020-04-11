import React from 'react';
import Delete from './Delete';
import Information from './Information';
import Region from './Region';
import { useApplicationID } from '../ApplicationContext';
import { useApplicationQuery } from '../../../queries';
import { useBreadcrumb } from '../Breadcrumbs';

export default function Settings() {
    const id = useApplicationID();
    const { data } = useApplicationQuery({ variables: { id } });

    useBreadcrumb({
        name: 'Settings',
        url: `/applications/${id}/settings`,
    });

    // TODO:
    if (!data) {
        return null;
    }

    return (
        <>
            <Region title="Information" first>
                <Information application={data.application} />
            </Region>
            <Region title="App Management">
                <Delete application={data.application} />
            </Region>
        </>
    );
}
