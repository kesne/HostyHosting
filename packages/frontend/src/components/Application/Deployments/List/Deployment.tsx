import React from 'react';
import { Deployment as DeploymentData } from '../../../../queries';
import DeleteDeployment from './DeleteDeployment';

type Props = {
    deployment: Pick<DeploymentData, 'id' | 'image'>;
};

export default function Container({ deployment }: Props) {
    return (
        <div>
            <p>{deployment.image}</p>
            <DeleteDeployment id={deployment.id} />
        </div>
    );
}
