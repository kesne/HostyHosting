import { useState } from 'react';
import { Form, Input } from 'antd';
import { useUpdateApplicationMutation, Application } from '../../../queries';

export type Props = {
    application: Pick<Application, 'id' |'name' | 'description'>;
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
                name,
                description
            }
        });
    }

    return (
        <Form layout="vertical">
            <Form.Item label="Name">
                <Input value={name} onChange={e => setName(e.target.value)} onBlur={handleBlur} />
            </Form.Item>
            <Form.Item label="Description">
                <Input.TextArea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    onBlur={handleBlur}
                />
            </Form.Item>
        </Form>
    );
}
