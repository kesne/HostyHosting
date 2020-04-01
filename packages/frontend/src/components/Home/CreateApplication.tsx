import React, { useEffect } from 'react';
import { useCreateApplicationMutation } from '../../queries';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button, { ButtonGroup } from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';

type Props = {
    organization?: number;
    visible: boolean;
    onClose(): void;
};

export default function CreateApplication({ organization, visible, onClose }: Props) {
    const [createApplication, { data, loading }] = useCreateApplicationMutation();
    const { reset, register, errors, handleSubmit } = useForm();

    useEffect(() => {
        if (visible) {
            reset();
        }
    }, [visible]);

    function handleFinish(values: Record<string, string>) {
        createApplication({
            variables: {
                org: organization,
                application: {
                    name: values.name,
                    description: values.description
                }
            }
        });
    }

    if (data) {
        return <Redirect to={`/applications/${data.organization.createApplication.id}`} />;
    }

    return (
        <Modal open={visible} onClose={onClose}>
            <form onSubmit={handleSubmit(handleFinish)}>
                <ModalContent title="Create Application">
                    <div className="grid grid-cols-1 row-gap-6">
                        <Input
                            name="name"
                            label="Application Name"
                            ref={register({ required: true })}
                            errors={errors}
                            disabled={loading}
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
