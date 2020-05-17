import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApplicationParams } from '../../ApplicationContext';
import Modal, { ModalContent, ModalFooter } from '../../../ui/Modal';
import Input from '../../../ui/Input';
import Button, { ButtonGroup } from '../../../ui/Button';
import Select from '../../../ui/Select';
import Tabs from '../../../ui/Tabs';
import { useMutation, graphql } from 'react-relay/hooks';
import { useNavigate } from 'react-router';
import { CreateComponentMutation, DeploymentStrategy } from './__generated__/CreateComponentMutation.graphql';

type Props = {
    visible: boolean;
    onClose(): void;
};

export default function CreateComponent({ visible, onClose }: Props) {
    const navigate = useNavigate();
    const params = useApplicationParams();
    const [deploymentType, setDeploymentType] = useState('docker-registry');

    const [commit, isInFlight] = useMutation<CreateComponentMutation>(graphql`
        mutation CreateComponentMutation($application: ID!, $component: ComponentInput!) {
            application(id: $application) {
                createComponent(component: $component) {
                    id
                    name
                    image
                }
            }
        }
    `);

    const { register, handleSubmit, errors, reset } = useForm();

    useEffect(() => {
        if (visible) {
            reset();
        }
    }, [visible]);

    function onSubmit(data: Record<string, string>) {
        commit({
            variables: {
                application: params.application,
                component: {
                    image: data.image,
                    name: data.name,
                    deploymentStrategy: data.strategy as DeploymentStrategy,
                },
            },
            onCompleted(data) {
                navigate(data.application.createComponent.id);
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
                                disabled={isInFlight}
                            />
                            <Input
                                label="Image Name"
                                name="image"
                                ref={register({ required: true })}
                                errors={errors}
                                autoComplete="off"
                                disabled={isInFlight}
                            />
                            {/* TODO: Make this a two-up big button UI. */}
                            <Select
                                label="Deployment Strategy"
                                name="strategy"
                                ref={register({ required: true })}
                                errors={errors}
                                disabled={isInFlight}
                            >
                                <option value="RECREATE">Re-create</option>
                                <option value="REPLACE">Replace (rolling deploy)</option>
                            </Select>
                        </div>
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button type="submit" variant="primary" disabled={isInFlight}>
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
