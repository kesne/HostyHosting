import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, graphql } from 'react-relay/hooks';
import Button from '../../../ui/Button';
import { DeleteComponentMutation } from './__generated__/DeleteComponentMutation.graphql';

type Props = {
    id: string;
};

export default function DeleteComponent({ id }: Props) {
    const navigate = useNavigate();

    const [commit, isInFlight] = useMutation<DeleteComponentMutation>(graphql`
        mutation DeleteComponentMutation($input: DeleteComponentInput!) {
            deleteComponent(input: $input) {
                id
            }
        }
    `);

    function handleDelete() {
        commit({
            variables: {
                input: {
                    componentID: id
                },
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
