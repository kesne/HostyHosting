import React from 'react';
import Delete from './Delete';
import Information from './Information';
import Region from './Region';
import { useApplicationQuery } from '../../../queries';
import { Breadcrumb } from '../Breadcrumbs';
import { useParams } from 'react-router';

export default function Settings() {
    const params = useParams();
    const { data } = useApplicationQuery({
        variables: {
            organization: params.organization,
            application: params.application,
        },
    });

    // TODO:
    if (!data) {
        return null;
    }

    const { application } = data.organization;

    return (
        <Breadcrumb name="Settings" url="settings">
            <div className="space-y-6">
                <Region title="Information">
                    <Information application={application} />
                </Region>
                <Region title="App Management">
                    <Delete application={application} />
                </Region>
            </div>
        </Breadcrumb>
    );
}
