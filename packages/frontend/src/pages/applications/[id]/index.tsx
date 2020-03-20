import { useRouter } from 'next/router';
import Application from '../../../components/Application';
import { withAuth } from '../../../components/utils/auth';

function ApplicationRoute() {
    const router = useRouter();
    const { id } = router.query;

    if (!id) {
        return null;
    }

    return <Application id={Number(id as string)} />;
}

export default withAuth(ApplicationRoute);
