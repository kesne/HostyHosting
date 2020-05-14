import React from 'react';
import Delete from './Delete';
import Information from './Information';
import Region from './Region';
import { useApplicationQuery } from '../../../queries';
import { Breadcrumb } from '../Breadcrumbs';
import { useParams } from 'react-router';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { useApplicationParams } from '../ApplicationContext';
import { SettingsQuery } from './__generated__/SettingsQuery.graphql';

export default function Settings() {
    const params = useApplicationParams();

    const data = useLazyLoadQuery<SettingsQuery>(graphql`
        query SettingsQuery($application: ID!) {
            application(id: $application) {
                ...Information_application
                ...Delete_application
            }
        }
    `, {
        application: params.application
    });

    return (
        <Breadcrumb name="Settings" url="settings">
            <div className="space-y-6">
                <Region title="Information">
                    <Information application={data.application} />
                </Region>
                <Region title="App Management">
                    <Delete application={data.application} />
                </Region>
            </div>
        </Breadcrumb>
    );
}
