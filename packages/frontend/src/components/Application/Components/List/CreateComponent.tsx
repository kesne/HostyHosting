import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    useCreateComponentMutation,
    ApplicationComponentsQuery,
    ApplicationComponentsDocument,
    DeploymentStrategy,
    ContainerSize,
} from '../../../../queries';
import { useApplicationID } from '../../ApplicationContext';
import produce from 'immer';
import Modal, { ModalContent, ModalFooter } from '../../../ui/Modal';
import Input from '../../../ui/Input';
import Button, { ButtonGroup } from '../../../ui/Button';
import Select from '../../../ui/Select';
import Tabs from '../../../ui/Tabs';
import clsx from 'clsx';
import Label from '../../../ui/Label';
import SelectEnvironment from './SelectEnvironment';

const Sizes = [
    { name: ContainerSize.S1x1, label: '1 CPU, 128 mb' },
    { name: ContainerSize.S2x2, label: '2 CPU, 256 mb' },
    { name: ContainerSize.S4x4, label: '4 CPU, 512 mb' },
    { name: ContainerSize.S8x8, label: '8 CPU, 1024 mb' },
];

type Props = {
    visible: boolean;
    onClose(): void;
};

export default function CreateComponent({ visible, onClose }: Props) {
    const applicationID = useApplicationID();
    const [deploymentType, setDeploymentType] = useState('docker-registry');
    const [containerSize, setContainerSize] = useState<ContainerSize>(ContainerSize.S1x1);
    const [environmentID, setEnvironmentID] = useState('');
    const [createComponent, { loading, data }] = useCreateComponentMutation({
        update(cache, { data }) {
            if (!data) return;

            // Read the data from our cache for this query.
            const { application } =
                cache.readQuery<ApplicationComponentsQuery>({
                    query: ApplicationComponentsDocument,
                    variables: { id: applicationID },
                }) ?? {};

            const nextApplication = produce(application, draftState => {
                draftState?.components.push(data.application.createComponent);
            });

            cache.writeQuery({
                query: ApplicationComponentsDocument,
                variables: { id: applicationID },
                data: { application: nextApplication },
            });
        },
    });
    const { register, handleSubmit, errors, reset } = useForm();

    useEffect(() => {
        if (visible) {
            reset();
        }
    }, [visible]);

    useEffect(() => {
        if (data) {
            onClose();
        }
    }, [data]);

    async function onSubmit(data: Record<string, string>) {
        await createComponent({
            variables: {
                applicationID,
                component: {
                    image: data.image,
                    name: data.name,
                    deploymentStrategy: data.strategy as DeploymentStrategy,
                    containerCount: Number(data.number),
                    size: containerSize,
                    environmentID: Number(environmentID),
                },
            },
        });
    }

    return (
        <>
            <Modal open={visible} onClose={onClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent title="Create Component">
                        <div className="grid grid-cols-1 row-gap-6">
                            <Tabs
                                flex
                                value={deploymentType}
                                onChange={value => setDeploymentType(value)}
                                tabs={[
                                    { label: 'Docker Registry', value: 'docker-registry' },
                                    { label: 'Github', value: 'github' },
                                    { label: 'Custom Registry', value: 'custom-registry' },
                                ]}
                            />
                            <Input
                                label="Name"
                                name="name"
                                ref={register({ required: true })}
                                errors={errors}
                            />
                            <Input
                                label="Image Name"
                                name="image"
                                ref={register({ required: true })}
                                errors={errors}
                            />
                            <div>
                                <Label>Container Size</Label>
                                <div className="grid grid-cols-2 gap-3 mt-1">
                                    {Sizes.map(size => (
                                        <button
                                            key={size.name}
                                            type="button"
                                            onClick={() => setContainerSize(size.name)}
                                            className={clsx(
                                                'rounded p-3 transition duration-150 ease-in-out focus:outline-none text-left',
                                                containerSize !== size.name &&
                                                    'border bg-gray-50 border-gray-200',
                                                containerSize === size.name &&
                                                    'bg-white border-indigo-600 border-2 shadow',
                                            )}
                                        >
                                            <div className="text-base text-gray-800">
                                                {size.name}
                                            </div>
                                            <div className="mt-1 text-xs rounded bg-gray-200 border border-gray-300 text-gray-800 inline p-1">
                                                {size.label}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <Input
                                defaultValue={1}
                                type="number"
                                name="number"
                                label="Number of Containers"
                                ref={register({
                                    required: { value: true, message: 'This field is required.' },
                                    min: {
                                        value: 1,
                                        message: 'You must deploy at least 1 container.',
                                    },
                                    max: {
                                        value: 10,
                                        message: 'You cannot deploy more than 10 containers.',
                                    },
                                })}
                                error={errors.number && errors.number.message}
                            />
                            {/* TODO: Make this a two-up big button UI. */}
                            <Select
                                label="Deployment Strategy"
                                name="strategy"
                                ref={register({ required: true })}
                                errors={errors}
                            >
                                <option value={DeploymentStrategy.Recreate}>Re-create</option>
                                <option value={DeploymentStrategy.Replace}>
                                    Replace (rolling deploy)
                                </option>
                            </Select>
                            <SelectEnvironment
                                value={environmentID}
                                onChange={value => setEnvironmentID(value)}
                            />
                        </div>
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button type="submit" variant="primary">
                                Create
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
}
