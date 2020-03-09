import { Button } from 'antd';
import {
    useDeleteContainerGroupMutation,
    ApplicationContainerGroupsQuery,
    ApplicationContainerGroupsDocument
} from '../../../queries';
import produce from 'immer';
import { useContext } from 'react';
import ApplicationContext from '../ApplicationContext';

type Props = {
    id: number;
};

export default function DeleteContainer({ id }: Props) {
    const applicationID = useContext(ApplicationContext);
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
        <Button type="danger" onClick={() => deleteContainerGroup()}>
            Delete
        </Button>
    );
}
