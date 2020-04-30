import React from 'react';
import Card, { CardContent } from '../../../ui/Card';
import formatCurrency from '../../../../utils/formatCurrency';
import { useContainerGroupQuery } from '../../../../queries';
import { useApplicationID } from '../../ApplicationContext';
import Button from '../../../ui/Button';
import Secrets from './Secrets';
import useBoolean from '../../../../utils/useBoolean';
import CreateContainerGroup from './CreateContainerGroup';
import EditOrAddSecret from './EditOrAddSecret';

type Props = {
    component: number;
    environment: number;
};

export default function ContainerGroup({ component, environment }: Props) {
    const app = useApplicationID();
    const { data } = useContainerGroupQuery({
        variables: {
            app,
            component,
            environment,
        },
    });
    const [creating, { on: creatingOn, off: creatingOff }] = useBoolean(false);
    const [addSecret, { on: addSecretOn, off: addSecretOff }] = useBoolean(false);

    if (!data) {
        return <div>I'm not an ass.</div>;
    }

    return (
        <>
            {data.application.component.containerGroup ? (
                <>
                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <Card>
                            <CardContent>
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                                        Monthly Cost
                                    </dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                                        {formatCurrency(
                                            data.application.component.containerGroup.monthlyPrice,
                                        )}
                                    </dd>
                                </dl>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                                        Instance Size
                                    </dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                                        {data.application.component.containerGroup.size}
                                    </dd>
                                </dl>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <dl>
                                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                                        Instance Count
                                    </dt>
                                    <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                                        {data.application.component.containerGroup.containerCount}
                                    </dd>
                                </dl>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="mt-4">
                        <Card
                            title="Secrets"
                            actions={
                                <Button variant="primary" onClick={addSecretOn}>
                                    Add
                                </Button>
                            }
                        >
                            <Secrets
                                id={data.application.component.containerGroup.id}
                                secrets={data.application.component.containerGroup.secrets}
                            />
                        </Card>
                        <EditOrAddSecret
                            id={data.application.component.containerGroup.id}
                            open={addSecret}
                            onClose={addSecretOff}
                            create
                        />
                    </div>
                </>
            ) : (
                <div className="mt-6 flex flex-col items-center">
                    <p className="mb-4 text-base font-medium text-gray-600">
                        This component is not deployed into this environment.
                    </p>
                    <Button variant="primary" onClick={creatingOn}>
                        Deploy to this environment
                    </Button>
                </div>
            )}
            <CreateContainerGroup
                component={component}
                environment={environment}
                open={creating}
                onClose={creatingOff}
            />
        </>
    );
}
