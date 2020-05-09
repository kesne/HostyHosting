import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Reference } from '@apollo/client';
import { useCreateComponentMutation, DeploymentStrategy } from '../../../../queries';
import { useApplicationParams } from '../../ApplicationContext';
import Modal, { ModalContent, ModalFooter } from '../../../ui/Modal';
import Input from '../../../ui/Input';
import Button, { ButtonGroup } from '../../../ui/Button';
import Select from '../../../ui/Select';
import Tabs from '../../../ui/Tabs';

type Props = {
    visible: boolean;
    onClose(): void;
};

export default function CreateComponent({ visible, onClose }: Props) {
    const params = useApplicationParams();
    const [deploymentType, setDeploymentType] = useState('docker-registry');
    const [createComponent, { loading, data }] = useCreateComponentMutation({
        update(cache, { data }) {
            if (!data) return;

            cache.modify(
                {
                    components(components: Reference[], { toReference }) {
                        return [...components, toReference(data.application.createComponent)];
                    },
                },
                `Application:${params.application}`,
            );
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
                ...params,
                component: {
                    image: data.image,
                    name: data.name,
                    deploymentStrategy: data.strategy as DeploymentStrategy,
                },
            },
        });
    }

    return (
        <>
            <Modal open={visible} onClose={onClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent title="Create Component">
                        <div className="space-y-6">
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
                            />
                            <Input
                                label="Image Name"
                                name="image"
                                ref={register({ required: true })}
                                errors={errors}
                                autoComplete="off"
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
