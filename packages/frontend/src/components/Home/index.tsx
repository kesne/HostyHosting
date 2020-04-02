import React, { useState } from 'react';
import CreateApplication from './CreateApplication';
import { useApplicationsQuery } from '../../queries';
import SelectOrganization from './SelectOrganization';
import PageHeader from '../ui/PageHeader';
import TailwindDropdown, { DropdownItem } from '../ui/Dropdown';
import { ListItem } from '../ui/List';
import Card from '../ui/Card';
import { useParams } from 'react-router-dom';

export default function Home() {
    // The ID for the organzation.
    // If not present, we will assume the user personal organization
    const params = useParams<{ organization: string }>();
    const organization = params.organization ? Number(params.organization) : undefined;

    const { data, loading } = useApplicationsQuery({
        variables: {
            org: organization,
        },
    });

    // TODO: Convert to useBoolean
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <PageHeader>
                <div className="flex">
                    <div className="flex-grow">
                        <SelectOrganization organization={organization} />
                    </div>
                    <TailwindDropdown label="New">
                        <DropdownItem onClick={() => setVisible(true)}>
                            New Application
                        </DropdownItem>
                        <DropdownItem>New Router</DropdownItem>
                    </TailwindDropdown>
                </div>
            </PageHeader>

            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-4 sm:px-0">
                        <Card
                            header={
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Applications
                                </h3>
                            }
                        >
                            <ul>
                                {data?.organization.applications.map(application => (
                                    <ListItem
                                        key={application.id}
                                        to={`/applications/${application.id}`}
                                    >
                                        <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                                            {application.name}
                                        </div>
                                    </ListItem>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            </main>

            <CreateApplication
                organization={organization}
                visible={visible}
                onClose={() => setVisible(false)}
            />
        </div>
    );
}
