import { Card, Typography } from 'antd';
import { Deployment as DeploymentData } from '../../../queries';

type Props = {
    applicationID: number;
    deployment: Pick<DeploymentData, 'id' | 'image'>;
};

export default function Container({ applicationID, deployment }: Props) {
    return (
        <Card size="small">
            <Typography.Text code>{deployment.image}</Typography.Text>
        </Card>
    );
}
