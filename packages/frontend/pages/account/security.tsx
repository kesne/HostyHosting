import { withAuth } from '../../components/utils/auth';
import Security from '../../components/Account/Security';
import Container from '../../components/Account/Container';

function SecurityRoute() {
    return (
        <Container selected="security">
            <Security />
        </Container>
    );
}

export default withAuth(SecurityRoute);
