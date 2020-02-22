import { useRouter } from 'next/router';
import { Spin } from 'antd';
import { useApplicationQuery } from '../../queries';

function ApplicationPage({ id }: { id: number }) {
    const { data, loading } = useApplicationQuery({
        variables: {
            id
        }
    });

    if (loading) {
        return <Spin />;
    }

    return <div>Application: {data?.application.name}</div>;
}

export default function Application() {
    const router = useRouter();
    const { id } = router.query;

    if (!id) {
        return <Spin />;
    }

    return <ApplicationPage id={Number(id as string)} />;
}
