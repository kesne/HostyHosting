import React from 'react';
import Select from '../forms/Select';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { SearchComponentsQuery } from './__generated__/SearchComponentsQuery.graphql';

type Props = {
    application: string;
    disabled?: boolean;
};

export default function SearchComponents({ application, disabled }: Props) {
    const data = useLazyLoadQuery<SearchComponentsQuery>(
        graphql`
            query SearchComponentsQuery($application: ID!) {
                application(id: $application) {
                    components(limit: 10) {
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
            application,
        },
    );

    return (
        <>
            <Select disabled={disabled} label="Component" name="component">
                <option></option>
                {data.application.components.edges.map(({ node: component }) => (
                    <option key={component.id} value={component.id}>
                        {component.label} ({component.name})
                    </option>
                ))}
            </Select>
        </>
    );
}
