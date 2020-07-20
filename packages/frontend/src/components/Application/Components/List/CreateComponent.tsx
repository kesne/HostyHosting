import React, { useState } from 'react';
import { useApplicationParams } from '../../ApplicationContext';
import Modal, { ModalContent, ModalFooter } from '../../../ui/Modal';
import Button, { ButtonGroup } from '../../../ui/Button';
import Tabs from '../../../ui/Tabs';
import { useMutation, graphql } from 'react-relay/hooks';
import { useNavigate } from 'react-router-dom';
import {
    CreateComponentMutation,
    DeploymentStrategy,
} from './__generated__/CreateComponentMutation.graphql';
import Form from '../../../forms/Form';
import Input from '../../../forms/Input';
import SubmitButton from '../../../forms/SubmitButton';
import Select from '../../../forms/Select';
import { paramCase } from 'param-case';

type Props = {
    visible: boolean;
    onClose(): void;
};

export default function CreateComponent({ visible, onClose }: Props) {
    const navigate = useNavigate();
    const params = useApplicationParams();
    const [deploymentType, setDeploymentType] = useState('docker-registry');

    const [commit, isInFlight] = useMutation<CreateComponentMutation>(graphql`
        mutation CreateComponentMutation($input: CreateComponentInput!) {
            createComponent(input: $input) {
                id
                name
                image
            }
        }
    `);

    function onSubmit(data: Record<string, string>) {
        commit({
            variables: {
                input: {
                    applicationID: params.application,
                    image: data.image,
                    label: data.label,
                    name: data.name,
                    deploymentStrategy: data.strategy as DeploymentStrategy,
                },
            },
            onCompleted(data) {
                navigate(data.createComponent.id);
            },
        });
    }

    return (
        <>
            <Modal open={visible} onClose={onClose}>
                <Form onSubmit={onSubmit} disabled={isInFlight}>
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
                                label="Label"
                                name="label"
                                register={{ required: true }}
                                assignOnChange={({ label }) => ({
                                    name: paramCase(label),
                                })}
                            />
                            <Input
                                label="Name"
                                name="name"
                                register={{ required: true }}
                            />
                            <Input
                                label="Image Name"
                                name="image"
                                register={{ required: true }}
                            />
                            {/* TODO: Make this a two-up big button UI. */}
                            <Select
                                label="Deployment Strategy"
                                name="strategy"
                                register={{ required: true }}
                            >
                                <option value="RECREATE">Re-create</option>
                                <option value="REPLACE">Replace (rolling deploy)</option>
                            </Select>
                        </div>
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button onClick={onClose}>Cancel</Button>
                            <SubmitButton>Create</SubmitButton>
                        </ButtonGroup>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    );
}
