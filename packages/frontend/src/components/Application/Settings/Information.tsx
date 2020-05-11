import React, { useState } from 'react';
import { useUpdateApplicationMutation, Application } from '../../../queries';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';

export type Props = {
    application: Pick<Application, 'id' | 'name' | 'description'>;
};

export default function Information({ application }: Props) {
    const [name, setName] = useState(application.name);
    const [description, setDescription] = useState(application.description || '');
    const [updateApplication] = useUpdateApplicationMutation();

    // TODO: We probably want some sort of saving indiator when we update these.
    function handleBlur() {
        updateApplication({
            variables: {
                id: application.id,
                application: {
                    name,
                    description,
                },
            },
        });
    }

    return (
        <div>
            <div className="mb-6">
                <Input
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onBlur={handleBlur}
                />
            </div>
            <TextArea
                label="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                onBlur={handleBlur}
            />
        </div>
    );
}
