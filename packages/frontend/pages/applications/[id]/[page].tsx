import { useRouter } from 'next/router';
import Application from '../../../components/Application';
import { withAuth } from '../../../components/utils/auth';

function ApplicationRoute() {
    const router = useRouter();
    const { id, page } = router.query;

    if (!id || !page) {
        return null;
    }

    return <Application id={Number(id as string)} page={page as string} />;
}

export default withAuth(ApplicationRoute);
