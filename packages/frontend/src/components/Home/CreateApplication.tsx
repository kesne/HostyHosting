import React, { useEffect } from 'react';
import { useCreateApplicationMutation } from '../../queries';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button, { ButtonGroup } from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import { Reference } from '@apollo/client';

type Props = {
    organization?: string;
    visible: boolean;
    onClose(): void;
};

export default function CreateApplication({ organization, visible, onClose }: Props) {
    const navigate = useNavigate();
    const [createApplication, { data, loading }] = useCreateApplicationMutation({
        update(cache, { data }) {
            if (!data) return;

            cache.modify(
                {
                    applications(applications: Reference[], { toReference }) {
                        return [...applications, toReference(data.organization.createApplication)];
                    },
                },
                `Organization:${organization}`,
            );
        },
    });
    const { reset, register, errors, handleSubmit } = useForm();

    useEffect(() => {
        if (visible) {
            reset();
        }
    }, [visible]);

    async function handleFinish(values: Record<string, string>) {
        await createApplication({
            variables: {
                org: organization,
                application: {
                    name: values.name,
                    description: values.description,
                },
            },
        });

        // TODO: Navigate pls:
        // navigate(`/applications/${data.organization.createApplication.id}`);
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
                            disabled={loading}
                            autoComplete="off"
                        />
                        <TextArea
                            name="description"
                            label="Description"
                            disabled={loading}
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
