import React from 'react';
import Input from '../ui/Input';
import CreateModal from '../ui/CreateModal';
import { useMutation, graphql } from 'react-relay/hooks';
import { CreateEnvironmentMutation } from './__generated__/CreateEnvironmentMutation.graphql';

type Props = {
    organization?: string;
    open: boolean;
    onClose(): void;
};

export default function CreateEnvironment({ organization, open, onClose }: Props) {
    const [commit, isInFlight] = useMutation<CreateEnvironmentMutation>(graphql`
        mutation CreateEnvironmentMutation($organization: ID, $name: String!, $label: String!) {
            organization(id: $organization) {
                createEnvironment(name: $name, label: $label) {
                    id
                    name
                    label
                }
            }
        }
    `);

    function onCreate(values: Record<string, string>) {
        commit({
            variables: {
                organization: organization,
                label: values.label,
                name: values.name,
            },
            updater(store) {
                const payload = store.getRootField('organization');
                const newNode = payload!.getLinkedRecord('createEnvironment', {
                    name: values.name,
                    label: values.label,
                });

                const organizationProxy = store.get(organization!);
                const newNodes = [...organizationProxy!.getLinkedRecords('environments'), newNode];
                organizationProxy!.setLinkedRecords(newNodes, 'environments');
            },
            onCompleted() {
                onClose();
            },
        });
    }

    return (
        <CreateModal title="Create Environment" open={open} onClose={onClose} onSubmit={onCreate}>
            {({ register, errors }) => (
                <div className="space-y-6">
                    <Input
                        label="Name"
                        name="name"
                        ref={register({ required: true })}
                        errors={errors}
                        disabled={isInFlight}
                    />
                    <Input
                        label="Label"
                        name="label"
                        ref={register({ required: true })}
                        errors={errors}
                        disabled={isInFlight}
                    />
                </div>
            )}
        </CreateModal>
    );
}
