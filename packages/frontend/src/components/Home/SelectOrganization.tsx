import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFragment, graphql } from 'react-relay/hooks';
import { SelectOrganization_me$key } from './__generated__/SelectOrganization_me.graphql';

const PERSONAL = 'personal';

type Props = {
    organization: SelectOrganization_me$key;
};

export default function SelectOrganization({ organization }: Props) {
    const navigate = useNavigate();

    const data = useFragment(graphql`
        fragment SelectOrganization_me on User {
            id
            personalOrganization {
                id
            }
            organizations {
                id
                name
                username
            }
        }
    `, organization);

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        if (event.target.value === PERSONAL) {
            navigate('/');
        } else {
            navigate(`/orgs/${event.target.value}`);
        }
    }

    return (
        <div className="relative rounded-md shadow-sm w-60">
            <select
                value={organization ? String(organization) : PERSONAL}
                onChange={handleChange}
                className="text-lg leading-6 font-semibold text-gray-900 block form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            >
                <option value={PERSONAL}>Personal</option>
                {data.organizations.map(org => (
                    <option key={org.username} value={org.username}>
                        {org.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
