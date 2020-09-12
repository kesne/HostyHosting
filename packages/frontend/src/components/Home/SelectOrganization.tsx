import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { SelectOrganizationQuery } from './__generated__/SelectOrganizationQuery.graphql';
import { BaseDropdown, DropdownItem } from '../ui/Dropdown';
import Container from '../ui/placeholder/Container';
import Text from '../ui/placeholder/Text';
import clsx from 'clsx';

function OrganizationItem({
    highlighted,
    selected,
}: {
    highlighted?: boolean;
    selected?: boolean;
}) {
    return (
        <li
            role="option"
            className={clsx(
                'cursor-default select-none relative py-2 pl-3 pr-9',
                highlighted ? 'text-white bg-indigo-600' : 'text-gray-900',
            )}
        >
            <div className="flex space-x-2">
                <span className={clsx('truncate', selected ? 'font-semibold' : 'font-normal')}>
                    Netflix
                </span>
                <span
                    className={clsx('truncate', highlighted ? 'text-indigo-200' : 'text-gray-500')}
                >
                    / netflix
                </span>
            </div>

            {selected && (
                <span
                    className={clsx(
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                        highlighted ? 'text-white' : 'text-indigo-600',
                    )}
                >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </span>
            )}
        </li>
    );
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
                    organizations(limit: 20) {
                        edges {
                            node {
                                organization {
                                    id
                                    name
                                    username
                                }
                            }
                        }
                    }
                }
                organization(username: $organization) {
                    id
                    name
                    username
                    isPersonal
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
            <div className="mb-10">
                <div className="rounded bg-white shadow-lg">
                    <div className="px-3 py-2 flex items-center space-x-2">
                        <input
                            className="text-base flex-1 w-full border-0 focus:outline-none"
                            autoFocus
                            placeholder="Organization..."
                        />
                        <button className="text-white w-7 rounded bg-indigo-500 p-1 hover:bg-gray-50 focus:outline-none focus:shadow-outline-indigo flex-shrink-0">
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
                    </div>
                    <ul className="max-h-60 py-1 text-base leading-6 overflow-auto focus:outline-none sm:text-sm sm:leading-5">
                        <OrganizationItem highlighted />
                        <OrganizationItem selected />
                    </ul>
                </div>
            </div>
            <div className="flex items-center mt-2">
                <div className="flex-1">
                    <h3 className="text-gray-900">{data.organization.name}</h3>
                    {!data.organization.isPersonal && (
                        <p className="text-sm text-gray-700">
                            {data.organization.memberCount} members
                        </p>
                    )}
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
                    {data.viewer.organizations.edges.map(({ node: { organization } }) => (
                        <DropdownItem
                            key={organization.username}
                            to={`/orgs/${organization.username}`}
                        >
                            {organization.name}
                        </DropdownItem>
                    ))}
                </BaseDropdown>
            </div>
        </>
    );
}

function SelectFallback() {
    return (
        <Container>
            <Text className="w-28" />
            <Text className="w-48" />
        </Container>
    );
}

export default function SelectOrganization() {
    return (
        <Suspense fallback={<SelectFallback />}>
            <SelectOrganizationWithData />
        </Suspense>
    );
}
