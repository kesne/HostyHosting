import React from 'react';
import Select from '../forms/Select';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { SearchEnvironmentsQuery } from './__generated__/SearchEnvironmentsQuery.graphql';

type Props = {
    organization: string;
    disabled?: boolean;
};

export default function SearchEnvironments({ organization, disabled }: Props) {
    const data = useLazyLoadQuery<SearchEnvironmentsQuery>(
        graphql`
            query SearchEnvironmentsQuery($organization: String!) {
                organization(username: $organization) {
                    environments {
                        id
                        label
                        name
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
            <Select disabled={disabled} label="Environment" name="environment">
                <option></option>
                {data.organization.environments.map(environment => (
                    <option key={environment.id} value={environment.id}>
                        {environment.label} ({environment.name})
                    </option>
                ))}
            </Select>
        </>
    );
}
