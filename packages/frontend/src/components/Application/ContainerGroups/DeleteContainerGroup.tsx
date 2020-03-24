import React from 'react';
import {
    useDeleteContainerGroupMutation,
    ApplicationContainerGroupsQuery,
    ApplicationContainerGroupsDocument
} from '../../../queries';
import produce from 'immer';
import { useApplicationID } from '../ApplicationContext';
import Button from '@daas/ui/Button';

type Props = {
    id: number;
};

export default function DeleteContainer({ id }: Props) {
    const applicationID = useApplicationID();
    const [deleteContainerGroup] = useDeleteContainerGroupMutation({
        variables: {
            applicationID,
            id
        },
        update(cache, { data }) {
            if (!data) return;

            // Read the data from our cache for this query.
            const { application } =
                cache.readQuery<ApplicationContainerGroupsQuery>({
                    query: ApplicationContainerGroupsDocument,
                    variables: { wid: applicationID }
                }) ?? {};

            if (!application?.containerGroups) {
                return;
            }

            const nextAppliction = produce(application, draftState => {
                draftState.containerGroups.splice(
                    draftState.containerGroups.findIndex(
                        container => container.id === data.application.deleteContainerGroup.id
                    ),
                    1
                );
            });

            cache.writeQuery({
                query: ApplicationContainerGroupsDocument,
                variables: { id: applicationID },
                data: { application: nextAppliction }
            });
        }
    });

    return (
        <Button variant="danger" onClick={() => deleteContainerGroup()}>
            Delete
        </Button>
    );
}
