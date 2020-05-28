import React from 'react';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import Button from '../../ui/Button';
import CreateApplication from './CreateApplication';
import useBoolean from '../../../utils/useBoolean';
import HomePage from '../HomePage';
import ApplicationsList from './ApplicationsList';
import { ApplicationsQuery } from './__generated__/ApplicationsQuery.graphql';

export default function Applications() {
    const params = useParams();
    const [create, { off, on }] = useBoolean(false);

    const data = useLazyLoadQuery<ApplicationsQuery>(
        graphql`
            query ApplicationsQuery($organization: String!, $cursor: ID, $count: Int!) {
                organization(username: $organization) {
                    id
                    username
                    ...ApplicationsListFragment_organization
                }
            }
        `,
        {
            organization: params.organization,
            count: 1,
        },
    );

    return (
        <>
            <HomePage
                title="Applications"
                actions={
                    <Button onClick={on} variant="primary">
                        Create Application
                    </Button>
                }
            >
                <ApplicationsList organization={data.organization} />
            </HomePage>
            <CreateApplication organization={data.organization.id} visible={create} onClose={off} />
        </>
    );
}
