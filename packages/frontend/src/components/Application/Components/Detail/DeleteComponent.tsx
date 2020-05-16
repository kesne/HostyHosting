import React from 'react';
import { useNavigate } from 'react-router';
import { useMutation, graphql } from 'react-relay/hooks';
import { useApplicationParams } from '../../ApplicationContext';
import Button from '../../../ui/Button';
import { DeleteComponentMutation } from './__generated__/DeleteComponentMutation.graphql';

type Props = {
    id: string;
};

export default function DeleteComponent({ id }: Props) {
    const params = useApplicationParams();
    const navigate = useNavigate();

    const [commit, isInFlight] = useMutation<DeleteComponentMutation>(graphql`
        mutation DeleteComponentMutation($application: ID!, $id: ID!) {
            application(id: $application) {
                deleteComponent(id: $id) {
                    id
                }
            }
        }
    `);

    function handleDelete() {
        commit({
            variables: {
                application: params.application,
                id,
            },
            onCompleted() {
                // TODO: Because these elements are teleported in context, we need to define
                // these routes relative to the root. Ideally, we would use a portal
                // rather than this teleportation to ensure that context works correctly.
                navigate('components', { replace: true });
            },
        });
    }

    return (
        <Button variant="danger" onClick={handleDelete} disabled={isInFlight}>
            Delete
        </Button>
    );
}
