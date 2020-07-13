import React from 'react';
import { useNavigate } from 'react-router-dom';
import { paramCase } from 'param-case';
import Modal, { ModalContent, ModalFooter } from '../../ui/Modal';
import Button, { ButtonGroup } from '../../ui/Button';
import { useMutation, graphql } from 'react-relay/hooks';
import Form from '../../forms/Form';
import Input from '../../forms/Input';
import TextArea from '../../forms/TextArea';
import SubmitButton from '../../forms/SubmitButton';
import { CreateApplicationMutation } from './__generated__/CreateApplicationMutation.graphql';

type Props = {
    organization: string;
    visible: boolean;
    onClose(): void;
};

export default function CreateApplication({ organization, visible, onClose }: Props) {
    const navigate = useNavigate();

    const [commit, isInFlight] = useMutation<CreateApplicationMutation>(graphql`
        mutation CreateApplicationMutation($input: CreateApplicationInput!) {
            createApplication(input: $input) {
                id
                name
                description
                organization {
                    id
                    username
                }
            }
        }
    `);

    function handleFinish(values: Record<string, string>) {
        commit({
            variables: {
                input: {
                    organizationID: organization,
                    label: values.label,
                    name: values.name,
                    description: values.description,
                },
            },
            onCompleted(data) {
                navigate(
                    `/orgs/${data.createApplication.organization.username}/apps/${data.createApplication.name}`,
                );
            },
        });
    }

    return (
        <Modal open={visible} onClose={onClose}>
            <Form onSubmit={handleFinish} disabled={isInFlight}>
                <ModalContent title="Create Application">
                    <div className="space-y-6">
                        <Input
                            name="label"
                            label="Label"
                            register={{ required: true }}
                            assignOnChange={({ label }) => ({
                                name: paramCase(label),
                            })}
                        />
                        <Input
                            name="name"
                            label="Name"
                            register={{ required: true }}
                        />
                        <TextArea name="description" label="Description" />
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
