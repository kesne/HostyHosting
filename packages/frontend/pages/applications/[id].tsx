import { useRouter } from 'next/router';
import Application from '../../components/Application';

export default function ApplicationRoute() {
    const router = useRouter();
    const { id } = router.query;

    if (!id) {
        return null;
    }

    return <Application id={Number(id as string)} />
}
