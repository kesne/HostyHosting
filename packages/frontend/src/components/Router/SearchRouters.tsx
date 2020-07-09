import React from 'react';
import Select from '../forms/Select';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { SearchRoutersQuery } from './__generated__/SearchRoutersQuery.graphql';

type Props = {
    organization: string;
    disabled?: boolean;
};

export default function SearchRouters({ organization, disabled }: Props) {
    const data = useLazyLoadQuery<SearchRoutersQuery>(
        graphql`
            query SearchRoutersQuery($organization: String!) {
                organization(username: $organization) {
                    routers {
                        id
                        label
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
            <Select disabled={disabled} label="Router" name="router">
                <option></option>
                {data.organization.routers.map(router => (
                    <option key={router.id} value={router.id}>
                        {router.label}
                    </option>
                ))}
            </Select>
        </>
    );
}
