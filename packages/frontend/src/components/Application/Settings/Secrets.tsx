import React, { useState } from 'react';
import { Application, useUpdateApplicationMutation, Secret } from '../../../queries';
import EditSecret from './EditSecret';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import useBoolean from '../../../utils/useBoolean';

export type Props = {
    application: Pick<Application, 'id' | 'secrets'>;
};

export default function Secrets({ application }: Props) {
    const [showing, { toggle }] = useBoolean(false);
    const [editing, setEditing] = useState<Secret | null>(null);
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [updateApplication, { loading }] = useUpdateApplicationMutation();

    async function handleAddSecret() {
        await updateApplication({
            variables: {
                id: application.id,
                secret: {
                    key,
                    value
                }
            }
        });
        setKey('');
        setValue('');
    }

    return (
        <>
            <EditSecret id={application.id} secret={editing} onClose={() => setEditing(null)} />
            <Button onClick={toggle}>Show/Hide Secrets</Button>
            {showing &&
                application.secrets.map((secret, index) => {
                    return (
                        <div className="flex" key={index}>
                            <div className="px-3 py-2 flex-1 rounded bg-gray-100 border border-gray-200 mr-4">
                                {secret.key || 'KEY'}
                            </div>
                            <div className="px-3 py-2 flex-1 rounded bg-gray-100 border border-gray-200 mr-4">
                                {secret.value || 'VALUE'}
                            </div>

                            <div>
                                <Button onClick={() => setEditing(secret)}>Edit</Button>
                                <Button>Delete</Button>
                            </div>
                        </div>
                    );
                })}
            <div className="grid sm:grid-cols-2 col-gap-6 row-gap-4">
                <Input
                    label="Key"
                    name="key"
                    placeholder="KEY"
                    value={key}
                    onChange={e => setKey(e.target.value)}
                />
                <Input
                    label="Value"
                    name="value"
                    placeholder="VALUE"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
            <Button onClick={handleAddSecret}>Add</Button>
        </>
    );
}
