import React, { useEffect } from 'react';
import { useApplicationEnvironmentsQuery } from '../../../../queries';
import { useApplicationID } from '../../ApplicationContext';
import Select from '../../../ui/Select';

export default function SelectEnvironment({
    value,
    onChange,
}: {
    value: string;
    onChange: (env: string) => void;
}) {
    const id = useApplicationID();
    const { data } = useApplicationEnvironmentsQuery({
        variables: {
            id,
        },
    });

    useEffect(() => {
        if (data) {
            onChange(String(data.application.environments[0].id));
        }
    }, [data]);

    return (
        <Select label="Environment" value={value} onChange={e => onChange(e.target.value)}>
            {data?.application.environments.map(({ id, name }) => (
                <option value={id}>{name}</option>
            ))}
        </Select>
    );
}
