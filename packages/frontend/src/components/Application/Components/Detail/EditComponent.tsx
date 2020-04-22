import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    DeploymentStrategy,
    ContainerSize,
    useUpdateComponentMutation,
} from '../../../../queries';
import { useApplicationID } from '../../ApplicationContext';
import Modal, { ModalContent, ModalFooter } from '../../../ui/Modal';
import Input from '../../../ui/Input';
import Button, { ButtonGroup } from '../../../ui/Button';
import Select from '../../../ui/Select';
import Tabs from '../../../ui/Tabs';
import clsx from 'clsx';
import Label from '../../../ui/Label';

const Sizes = [
    { name: ContainerSize.S1x1, label: '1 Compute Unit, 128 mb' },
    { name: ContainerSize.S2x2, label: '2 Compute Unit, 256 mb' },
    { name: ContainerSize.S4x4, label: '4 Compute Unit, 512 mb' },
    { name: ContainerSize.S8x8, label: '8 Compute Unit, 1024 mb' },
];

type ComponentToEdit = {
    id: number;
    name: string;
    image: string;
    containerGroup: {
        size: ContainerSize;
        containerCount: number;
    };
};

type Props = {
    component: ComponentToEdit;
    visible: boolean;
    onClose(): void;
};

export default function EditComponent({ component, visible, onClose }: Props) {
    const applicationID = useApplicationID();
    const [deploymentType, setDeploymentType] = useState('docker-registry');
    const [containerSize, setContainerSize] = useState<ContainerSize>(
        component.containerGroup.size,
    );
    const [updateComponent, { loading, data }] = useUpdateComponentMutation();
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
        await updateComponent({
            variables: {
                applicationID,
                componentID: component.id,
                component: {
                    image: data.image,
                    name: data.name,
                    deploymentStrategy: data.strategy as DeploymentStrategy,
                    containerCount: Number(data.number),
                    size: containerSize,
                },
            },
        });
    }

    return (
        <>
            <Modal open={visible} onClose={onClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent title="Edit Component">
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
                                autoComplete="off"
                                defaultValue={component.name}
                            />
                            <Input
                                label="Image Name"
                                name="image"
                                ref={register({ required: true })}
                                errors={errors}
                                autoComplete="off"
                                defaultValue={component.image}
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
                                defaultValue={component.containerGroup.containerCount}
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
                        </div>
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button type="submit" variant="primary">
                                Save Changes
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
}
