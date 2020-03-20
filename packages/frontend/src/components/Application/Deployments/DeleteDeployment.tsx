import React, { useContext } from 'react';
import { Button } from 'antd';
import {
    useDeleteDeploymentMutation,
    ApplicationDeploymentsQuery,
    ApplicationDeploymentsDocument
} from '../../../queries';
import produce from 'immer';
import ApplicationContext from '../ApplicationContext';

type Props = {
    id: number;
};

export default function DeleteDeployment({ id }: Props) {
    const applicationID = useContext(ApplicationContext);
    const [deleteDeployment] = useDeleteDeploymentMutation({
        variables: {
            applicationID,
            id
        },
        update(cache, { data }) {
            if (!data) return;

            // Read the data from our cache for this query.
            const { application } =
                cache.readQuery<ApplicationDeploymentsQuery>({
                    query: ApplicationDeploymentsDocument,
                    variables: { id: applicationID }
                }) ?? {};

            if (!application?.deployments) {
                return;
            }

            const nextAppliction = produce(application, draftState => {
                draftState.deployments.splice(
                    draftState.deployments.findIndex(
                        container => container.id === data.application.deleteDeployment.id
                    ),
                    1
                );
            });

            cache.writeQuery({
                query: ApplicationDeploymentsDocument,
                variables: { id: applicationID },
                data: { application: nextAppliction }
            });
        }
    });

    return (
        <Button type="danger" onClick={() => deleteDeployment()}>
            Delete
        </Button>
    );
}
