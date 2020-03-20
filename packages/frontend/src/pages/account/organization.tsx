import { withAuth } from '../../components/utils/auth';
import Container from '../../components/Account/Container';

function OrganizationRoute() {
    return (
        <Container selected="organization">
            <p>Yeet, this is a placeholder. :)</p>;
        </Container>
    );
}

export default withAuth(OrganizationRoute);
