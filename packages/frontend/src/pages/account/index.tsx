import { withAuth } from '../../components/utils/auth';
import Container from '../../components/Account/Container';
import EditAccount from '../../components/Account/EditAccount';

function AccountRoute() {
    return (
        <Container selected="account">
            <EditAccount />
        </Container>
    );
}

export default withAuth(AccountRoute);
