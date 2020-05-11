import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Label from '../../../ui/Label';
import { ContainerSize, useCreateContainerGroupMutation } from '../../../../queries';
import Input from '../../../ui/Input';
import CreateModal from '../../../ui/CreateModal';
import { useApplicationParams } from '../../ApplicationContext';
import { Reference } from '@apollo/client';

const Sizes = [
    { name: ContainerSize.S1x1, label: '1 Compute Unit, 128 mb' },
    { name: ContainerSize.S2x2, label: '2 Compute Unit, 256 mb' },
    { name: ContainerSize.S4x4, label: '4 Compute Unit, 512 mb' },
    { name: ContainerSize.S8x8, label: '8 Compute Unit, 1024 mb' },
];

type Props = {
    component: string;
    environment: string;
    open: boolean;
    onClose(): void;
};

export default function CreateContainerGroup({ component, environment, open, onClose }: Props) {
    // TODO: CreateModal should support custom values:
    const params = useApplicationParams();
    const [containerSize, setContainerSize] = useState<ContainerSize>(ContainerSize.S1x1);
    const [createContainerGroup, { data, loading }] = useCreateContainerGroupMutation({
        update(cache, { data }) {
            if (!data) return;

            cache.modify(
                {
                    containerGroup(existing: Reference, { toReference, storeFieldName }) {
                        // TODO: I hate this, and honestly it might be easier to just refetch the parent query than try to do this correctly.
                        if (
                            storeFieldName === `containerGroup:${JSON.stringify({ environment })}`
                        ) {
                            return toReference(data.application.createContainerGroup);
                        }

                        return existing;
                    },
                },
                `Component:${component}`,
            );
        },
    });

    useEffect(() => {
        if (open) {
            setContainerSize(ContainerSize.S1x1);
        }
    }, [open]);

    useEffect(() => {
        if (data) {
            onClose();
        }
    }, [data]);

    function handleSubmit(values: Record<string, string>) {
        createContainerGroup({
            variables: {
                ...params,
                containerGroup: {
                    componentID: component,
                    size: containerSize,
                    containerCount: Number(values.containerCount),
                    environmentID: environment,
                },
            },
        });
    }

    return (
        <CreateModal title="Deploy Component" open={open} onClose={onClose} onSubmit={handleSubmit}>
            {({ register, errors }) => (
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
                </div>
            )}
        </CreateModal>
    );
}
