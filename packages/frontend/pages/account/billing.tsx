import { Typography } from 'antd';
import { withAuth } from '../../components/utils/auth';
import Container from '../../components/Account/Container';

function BillingRoute() {
    return (
        <Container selected="billing">
            <Typography.Text>Yeet, this is a placeholder. :)</Typography.Text>;
        </Container>
    );
}

export default withAuth(BillingRoute);
