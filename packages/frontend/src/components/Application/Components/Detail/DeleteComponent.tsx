import React from 'react';
import {
    useDeleteComponentMutation,
    ApplicationComponentsQuery,
    ApplicationComponentsDocument
} from '../../../../queries';
import produce from 'immer';
import { useApplicationID } from '../../ApplicationContext';
import Button from '../../../ui/Button';

type Props = {
    id: number;
};

export default function DeleteComponent({ id }: Props) {
    const applicationID = useApplicationID();
    const [deleteDeployment] = useDeleteComponentMutation({
        variables: {
            applicationID,
            id
        },
        update(cache, { data }) {
            if (!data) return;

            // Read the data from our cache for this query.
            const { application } =
                cache.readQuery<ApplicationComponentsQuery>({
                    query: ApplicationComponentsDocument,
                    variables: { id: applicationID }
                }) ?? {};

            if (!application?.components) {
                return;
            }

            const nextAppliction = produce(application, draftState => {
                draftState.components.splice(
                    draftState.components.findIndex(
                        container => container.id === data.application.deleteComponent.id
                    ),
                    1
                );
            });

            cache.writeQuery({
                query: ApplicationComponentsDocument,
                variables: { id: applicationID },
                data: { application: nextAppliction }
            });
        }
    });

    return (
        <Button variant="danger" onClick={() => deleteDeployment()}>
            Delete
        </Button>
    );
}
