import Region from './Region';
import Delete from './Delete';
import Secrets from './Secrets';
import Information from './Information';
import { Application } from '../../../queries';

type Props = {
    application: Application;
};

export default function Settings({ application }: Props) {
    return (
        <>
            <Region title="Information">
                <Information application={application} />
            </Region>
            <Region
                title="Secrets"
                description="Manage environment variables that will be set when your application starts."
            >
                <Secrets application={application} />
            </Region>
            <Region title="App Management" last>
                <Delete />
            </Region>
        </>
    );
}
