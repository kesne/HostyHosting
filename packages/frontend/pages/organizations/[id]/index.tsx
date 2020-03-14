import { useRouter } from 'next/router';
import Home from '../../../components/Home';
import { withAuth } from '../../../components/utils/auth';

function OrganizationHome() {
    const router = useRouter();

    if (!router.query.id) {
        return null;
    }

    return <Home organization={Number(router.query.id)} />;
}

export default withAuth(OrganizationHome);
