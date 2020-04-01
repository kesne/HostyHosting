import React, { useEffect, useState } from 'react';
import {
    useCreateContainerGroupMutation,
    ApplicationContainerGroupsDocument,
    ApplicationContainerGroupsQuery,
    useApplicationDeploymentsQuery,
    ContainerSize,
} from '../../../queries';
import { useApplicationID } from '../ApplicationContext';
import produce from 'immer';
import { useForm } from 'react-hook-form';
import Modal, { ModalContent, ModalFooter } from '../../ui/Modal';
import Button, { ButtonGroup } from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import clsx from 'clsx';
import Label from '../../ui/Label';

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

export default function CreateContainer({ visible, onClose }: Props) {
    const applicationID = useApplicationID();
    const { register, handleSubmit, errors, reset } = useForm();
    const [containerSize, setContainerSize] = useState<ContainerSize>(ContainerSize.S1x1);

    const deploymentsState = useApplicationDeploymentsQuery({
        variables: {
            id: applicationID,
        },
    });

    const [createContainerGroup, { loading, data }] = useCreateContainerGroupMutation({
        update(cache, { data }) {
            if (!data) return;

            // Read the data from our cache for this query.
            const { application } =
                cache.readQuery<ApplicationContainerGroupsQuery>({
                    query: ApplicationContainerGroupsDocument,
                    variables: { id: applicationID },
                }) ?? {};

            const nextApplication = produce(application, draftState => {
                draftState?.containerGroups.push(data.application.createContainerGroup);
            });

            cache.writeQuery({
                query: ApplicationContainerGroupsDocument,
                variables: { id: applicationID },
                data: { application: nextApplication },
            });
        },
    });

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

    async function handleOk(data: Record<string, string>) {
        await createContainerGroup({
            variables: {
                applicationID,
                containerGroup: {
                    deploymentID: Number(data.deployment),
                    label: data.label,
                    size: containerSize,
                    number: Number(data.number),
                },
            },
        });
    }

    return (
        <Modal open={visible} onClose={onClose}>
            <form onSubmit={handleSubmit(handleOk)}>
                <ModalContent title="Create Container">
                    <p className="text-gray-800 text-sm font-normal mb-4">
                        Select the size of the container, and the number of containers that you
                        would like to deploy. The size of the container can <strong>not</strong> be
                        changed after it is created. The number of deployments can be changed at any
                        time.
                    </p>
                    <div className="grid grid-cols-1 row-gap-6">
                        <Input
                            name="label"
                            label="Label"
                            ref={register({ required: true })}
                            error={errors.label && 'The image name is required.'}
                        />
                        <Select
                            defaultValue=""
                            name="deployment"
                            label="Deployment"
                            ref={register({ required: true })}
                            error={errors.deployment && 'The image name is required.'}
                        >
                            <option value="" disabled>
                                Select a deployment...
                            </option>
                            {deploymentsState.data?.application.deployments.map(deployment => (
                                <option key={deployment.id} value={deployment.id}>
                                    {deployment.image}
                                </option>
                            ))}
                        </Select>
                        <div>
                            <Label>Container Size</Label>
                            <div className="grid grid-cols-2 gap-3 mt-1">
                                {Sizes.map(size => (
                                    <button
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
                            name="number"
                            label="Number of Containers"
                            ref={register({
                                required: { value: true, message: 'This field is required.' },
                                min: { value: 1, message: 'You must deploy at least 1 container.' },
                                max: {
                                    value: 10,
                                    message: 'You cannot deploy more than 10 containers.',
                                },
                            })}
                            error={errors.number && errors.number.message}
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
    );
}
