import { Button } from 'antd';
import {
    useDeleteContainerMutation,
    ApplicationContainersQuery,
    ApplicationContainersDocument
} from '../../../queries';
import produce from 'immer';
import { useContext } from 'react';
import ApplicationContext from '../ApplicationContext';

type Props = {
    id: number;
};

export default function DeleteContainer({ id }: Props) {
    const applicationID = useContext(ApplicationContext);
    const [deleteContainer] = useDeleteContainerMutation({
        variables: {
            applicationID,
            id
        },
        update(cache, { data }) {
            if (!data) return;

            // Read the data from our cache for this query.
            const { application } =
                cache.readQuery<ApplicationContainersQuery>({
                    query: ApplicationContainersDocument,
                    variables: { id: applicationID }
                }) ?? {};

            if (!application?.containers) {
                return;
            }

            const nextAppliction = produce(application, (draftState) => {
                draftState.containers.splice(
                    draftState.containers.findIndex(
                        container => container.id === data.application.deleteContainer.id
                    ),
                    1
                );
            });

            cache.writeQuery({
                query: ApplicationContainersDocument,
                variables: { id: applicationID },
                data: { application: nextAppliction }
            });
        }
    });

    return (
        <Button type="danger" onClick={() => deleteContainer()}>
            Delete
        </Button>
    );
}
