import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button, { ButtonGroup } from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import { useMutation, graphql } from 'react-relay/hooks';
import { CreateApplicationMutation } from './__generated__/CreateApplicationMutation.graphql';

type Props = {
    organization?: string;
    visible: boolean;
    onClose(): void;
};

export default function CreateApplication({ organization, visible, onClose }: Props) {
    const navigate = useNavigate();

    const [commit, isInFlight] = useMutation<CreateApplicationMutation>(graphql`
        mutation CreateApplicationMutation($organization: ID, $application: ApplicationInput!) {
            organization(id: $organization) {
                createApplication(application: $application) {
                    id
                    name
                    description
                    organization {
                        id
                        username
                    }
                }
            }
        }
    `);

    const { reset, register, errors, handleSubmit } = useForm();

    useEffect(() => {
        if (visible) {
            reset();
        }
    }, [visible]);

    function handleFinish(values: Record<string, string>) {
        commit({
            variables: {
                organization,
                application: {
                    name: values.name,
                    description: values.description,
                },
            },
            onCompleted(data) {
                navigate(
                    `/orgs/${data.organization.createApplication.organization.username}/apps/${data.organization.createApplication.name}`,
                );
            },
        });
    }

    return (
        <Modal open={visible} onClose={onClose}>
            <form onSubmit={handleSubmit(handleFinish)}>
                <ModalContent title="Create Application">
                    <div className="space-y-6">
                        <Input
                            name="name"
                            label="Application Name"
                            ref={register({ required: true })}
                            errors={errors}
                            disabled={isInFlight}
                            autoComplete="off"
                        />
                        <TextArea
                            name="description"
                            label="Description"
                            disabled={isInFlight}
                            ref={register()}
                        />
                    </div>
                </ModalContent>
                <ModalFooter>
                    <ButtonGroup>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ButtonGroup>
                </ModalFooter>
            </form>
        </Modal>
    );
}
