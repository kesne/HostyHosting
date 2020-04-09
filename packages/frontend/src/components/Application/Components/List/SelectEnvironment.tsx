import React from 'react';
import { useApplicationEnvironmentsQuery } from '../../../../queries';
import { useApplicationID } from '../../ApplicationContext';
import Select from '../../../ui/Select';

export default function SelectEnvironment({
    value,
    onChange,
}: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
    const id = useApplicationID();
    const { data } = useApplicationEnvironmentsQuery({
        variables: {
            id,
        },
    });

    return (
        <Select label="Environment" value={value} onChange={onChange}>
            {data?.application.environments.map(({ id, name }) => (
                <option value={id}>{name}</option>
            ))}
        </Select>
    );
}
