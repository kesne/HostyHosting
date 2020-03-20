import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMyOrganizationsQuery } from '../../queries';

const PERSONAL = 'personal';

type Props = {
    organization?: number;
};

export default function SelectOrganization({ organization }: Props) {
    const { data, loading } = useMyOrganizationsQuery();
    const history = useHistory();

    console.log('HELLLO !! ???');

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        if (event.target.value === PERSONAL) {
            history.push('/home');
        } else {
            history.push(`/orgs/${event.target.value}`);
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
                {data?.me.organizations.map(org => (
                    <option key={org.id} value={String(org.id)}>
                        {org.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
