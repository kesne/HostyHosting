import { Typography } from 'antd';
import { withAuth } from '../../components/utils/auth';
import Container from '../../components/Account/Container';

function OrganizationRoute() {
    return (
        <Container selected="organization">
            <Typography.Text>Yeet, this is a placeholder. :)</Typography.Text>;
        </Container>
    );
}

export default withAuth(OrganizationRoute);
