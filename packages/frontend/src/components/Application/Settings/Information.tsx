import React, { useState } from 'react';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import { useFragment, graphql, useMutation } from 'react-relay/hooks';
import { Information_application$key } from './__generated__/Information_application.graphql';
import { InformationUpdateMutation } from './__generated__/InformationUpdateMutation.graphql';

export type Props = {
    application: Information_application$key;
};

export default function Information({ application }: Props) {
    const data = useFragment(
        graphql`
            fragment Information_application on Application {
                id
                name
                description
            }
        `,
        application,
    );

    const [commit, isInFlight] = useMutation<InformationUpdateMutation>(graphql`
        mutation InformationUpdateMutation($id: ID!, $application: ApplicationInput!) {
            application(id: $id) {
                update(application: $application) {
                    id
                    name
                    description
                }
            }
        }
    `);

    const [name, setName] = useState(data.name);
    const [description, setDescription] = useState(data.description || '');

    // TODO: We probably want some sort of saving indiator when we update these.
    function handleBlur() {
        commit({
            variables: {
                id: data.id,
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
                    disabled={isInFlight}
                />
            </div>
            <TextArea
                label="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                onBlur={handleBlur}
                disabled={isInFlight}
            />
        </div>
    );
}
