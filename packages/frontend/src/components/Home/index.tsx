import React from 'react';
import SelectOrganization from './SelectOrganization';
import PageHeader from '../ui/PageHeader';
import Dropdown, { DropdownItem } from '../ui/Dropdown';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { HomeQuery } from './__generated__/HomeQuery.graphql';
import Applications from './Applications';
import Environments from './Environments';

// TODO: Don't make the default route go here, instead use a redirect to route into
// the personal organization `/orgs/:username`.
export default function Home() {
    // TODO: Don't do this:
    // NOTE: If not present, we will assume the user personal organization
    const params = useParams();

    const data = useLazyLoadQuery<HomeQuery>(
        graphql`
            query HomeQuery($organization: String) {
                viewer {
                    ...SelectOrganization_viewer
                }
                organization(username: $organization) {
                    ...Applications_organization
                    ...Environments_organization
                }
            }
        `,
        {
            organization: params.organization,
        },
    );

    return (
        <div>
            <PageHeader>
                <SelectOrganization viewer={data.viewer} />
            </PageHeader>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-4 sm:px-0 space-y-6">
                        <Applications organization={data.organization} />
                        <Environments organization={data.organization} />
                    </div>
                </div>
            </main>
        </div>
    );
}
