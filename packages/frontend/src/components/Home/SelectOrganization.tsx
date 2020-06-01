import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { SelectOrganizationQuery } from './__generated__/SelectOrganizationQuery.graphql';
import { BaseDropdown, DropdownItem } from '../ui/Dropdown';

function TextRow() {
    return 'TODO: Fix this!';
}

function SelectOrganizationWithData() {
    const params = useParams();

    const data = useLazyLoadQuery<SelectOrganizationQuery>(
        graphql`
            query SelectOrganizationQuery($organization: String!) {
                viewer {
                    id
                    personalOrganization {
                        id
                        username
                    }
                    organizations {
                        id
                        name
                        username
                    }
                }
                organization(username: $organization) {
                    id
                    name
                    username
                    memberCount
                }
            }
        `,
        {
            organization: params.organization,
        },
    );

    return (
        <>
            <div className="flex items-center mt-2">
                <div className="flex-1">
                    <h3 className="text-gray-900">{data.organization.name}</h3>
                    <p className="text-sm text-gray-700">{data.organization.memberCount} members</p>
                </div>
                <BaseDropdown
                    Component={({ onClick }) => (
                        <button
                            onClick={onClick}
                            className="text-gray-800 w-7 rounded bg-gray-200 p-1 hover:bg-gray-50 focus:outline-none focus:shadow-outline-indigo"
                        >
                            <svg
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                            </svg>
                        </button>
                    )}
                >
                    <DropdownItem to={`/orgs/${data.viewer.personalOrganization.username}`}>
                        Personal
                    </DropdownItem>
                    {data.viewer.organizations.map(org => (
                        <DropdownItem key={org.username} to={`/orgs/${org.username}`}>
                            {org.name}
                        </DropdownItem>
                    ))}
                </BaseDropdown>
            </div>
        </>
    );
}

function SelectFallback() {
    return (
        <div>
            <div className="w-28">
                <TextRow color="#E0E0E0" />
            </div>
            <div className="w-48">
                <TextRow color="#E0E0E0" />
            </div>
        </div>
    );
}

export default function SelectOrganization() {
    return (
        <Suspense fallback={<SelectFallback />}>
            <SelectOrganizationWithData />
        </Suspense>
    );
}
