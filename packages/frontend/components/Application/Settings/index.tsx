import Region from './Region';
import Delete, { Props as DeleteProps } from './Delete';
import Secrets, { Props as SecretProps } from './Secrets';
import Information, { Props as InformationProps } from './Information';

type Props = {
    application: InformationProps['application'] &
        SecretProps['application'] &
        DeleteProps['application'];
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
                <Delete application={application} />
            </Region>
        </>
    );
}
