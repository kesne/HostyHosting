import React, { useState, unstable_useDeferredValue } from 'react';
import Select from '../forms/Select';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import Input from '../ui/Input';
import { SearchApplicationsQuery } from './__generated__/SearchApplicationsQuery.graphql';

type Props = {
    organization: string;
};

export default function SearchApplications({ organization }: Props) {
    const data = useLazyLoadQuery<SearchApplicationsQuery>(
        graphql`
            query SearchApplicationsQuery($organization: String!) {
                organization(username: $organization) {
                    applications(limit: 10) {
                        edges {
                            node {
                                id
                                name
                                label
                            }
                        }
                    }
                }
            }
        `,
        {
            organization,
        },
    );

    return (
        <>
            <Select label="Application" name="application">
                <option></option>
                {data.organization.applications.edges.map(({ node: application }) => (
                    <option key={application.id} value={application.id}>{application.label} ({application.name})</option>
                ))}
            </Select>
        </>
    );
}
