import React, { useState, useEffect } from 'react';
import { useMutation, graphql } from 'react-relay/hooks';
import clsx from 'clsx';
import Label from '../../../ui/Label';
import { useApplicationParams } from '../../ApplicationContext';
import {
    CreateContainerGroupMutation,
    ContainerSize,
} from './__generated__/CreateContainerGroupMutation.graphql';
import Modal, { ModalContent, ModalFooter } from '../../../ui/Modal';
import Button, { ButtonGroup } from '../../../ui/Button';
import Form from '../../../forms/Form';
import Input from '../../../forms/Input';
import SubmitButton from '../../../forms/SubmitButton';

const Sizes = [
    { name: 'S1x1', label: '1 Compute Unit, 128 mb' },
    { name: 'S2x2', label: '2 Compute Unit, 256 mb' },
    { name: 'S4x4', label: '4 Compute Unit, 512 mb' },
    { name: 'S8x8', label: '8 Compute Unit, 1024 mb' },
] as const;

type Props = {
    component: string;
    environment: string;
    open: boolean;
    onClose(): void;
};

export default function CreateContainerGroup({ component, environment, open, onClose }: Props) {
    // TODO: Form should support custom values:
    const params = useApplicationParams();
    const [containerSize, setContainerSize] = useState<ContainerSize>('S1x1');

    const [commit, isInFlight] = useMutation<CreateContainerGroupMutation>(graphql`
        mutation CreateContainerGroupMutation(
            $application: ID!
            $containerGroup: ContainerGroupInput!
        ) {
            application(id: $application) {
                createContainerGroup(containerGroup: $containerGroup) {
                    id
                    monthlyPrice
                    containerCount
                    size
                    secrets {
                        id
                        key
                        value
                    }
                }
            }
        }
    `);

    // NOTE: This is needed because this state isn't managed in the react hook form.
    // This ensures the form state is reset between subsequent opens of the modal.
    useEffect(() => {
        if (open) {
            setContainerSize('S1x1');
        }
    }, [open]);

    function handleSubmit(values: Record<string, string>) {
        commit({
            variables: {
                ...params,
                containerGroup: {
                    componentID: component,
                    size: containerSize,
                    containerCount: Number(values.containerCount),
                    environmentID: environment,
                },
            },
            onCompleted() {
                onClose();
            },
        });
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Form onSubmit={handleSubmit} disabled={isInFlight}>
                <ModalContent title="Deploy Component">
                    <div className="space-y-6">
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
                                        <div className="text-base text-gray-800">{size.name}</div>
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
                            name="containerCount"
                            label="Number of Containers"
                            register={{
                                required: { value: true, message: 'This field is required.' },
                                min: {
                                    value: 1,
                                    message: 'You must deploy at least 1 container.',
                                },
                                max: {
                                    value: 10,
                                    message: 'You cannot deploy more than 10 containers.',
                                },
                            }}
                        />
                    </div>
                </ModalContent>
                <ModalFooter>
                    <ButtonGroup>
                        <SubmitButton>Create</SubmitButton>
                        <Button onClick={onClose}>Cancel</Button>
                    </ButtonGroup>
                </ModalFooter>
            </Form>
        </Modal>
    );
}
