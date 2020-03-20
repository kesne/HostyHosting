import { withAuth } from '../../components/utils/auth';
import Container from '../../components/Account/Container';

function BillingRoute() {
    return (
        <Container selected="billing">
            <p>Yeet, this is a placeholder. :)</p>;
        </Container>
    );
}

export default withAuth(BillingRoute);
