import Router from 'next/router';
import { Select } from 'antd';
import { useMyOrganizationsQuery } from '../../queries';

const PERSONAL = 'personal';

type Props = {
    organization?: number;
};

export default function SelectOrganization({ organization }: Props) {
    const { data, loading } = useMyOrganizationsQuery();

    function handleChange(value: string) {
        if (value === PERSONAL) {
            Router.push('/home');
        } else {
            Router.push(`/organizations/${value}`);
        }
    }

    return (
        <Select
            style={{ minWidth: 200 }}
            size="large"
            defaultValue={organization ? String(organization) : PERSONAL}
            onChange={handleChange}
            loading={loading}
            className="text-lg leading-6 font-semibold text-gray-900"
            showSearch
        >
            <Select.Option value={PERSONAL}>Personal</Select.Option>
            {data?.me.organizations.map(org => (
                <Select.Option key={org.id} value={String(org.id)}>
                    {org.name}
                </Select.Option>
            ))}
        </Select>
    );
}
