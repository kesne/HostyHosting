import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    useCreateDeploymentMutation,
    ApplicationDeploymentsQuery,
    ApplicationDeploymentsDocument
} from '../../../queries';
import { useApplicationID } from '../ApplicationContext';
import produce from 'immer';
import Modal, { ModalContent, ModalFooter } from '../../ui/Modal';
import Input from '../../ui/Input';
import Button, { ButtonGroup } from '../../ui/Button';

type Props = {
    visible: boolean;
    onClose(): void;
};

export default function CreateDeployment({ visible, onClose }: Props) {
    const applicationID = useApplicationID();
    const [createDeployment, { loading, data }] = useCreateDeploymentMutation({
        update(cache, { data }) {
            if (!data) return;

            // Read the data from our cache for this query.
            const { application } =
                cache.readQuery<ApplicationDeploymentsQuery>({
                    query: ApplicationDeploymentsDocument,
                    variables: { id: applicationID }
                }) ?? {};

            const nextApplication = produce(application, draftState => {
                draftState?.deployments.push(data.application.createDeployment);
            });

            cache.writeQuery({
                query: ApplicationDeploymentsDocument,
                variables: { id: applicationID },
                data: { application: nextApplication }
            });
        }
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
        await createDeployment({
            variables: {
                applicationID,
                image: data.image
            }
        });
    }

    return (
        <>
            <Modal open={visible} onClose={onClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent title="Create Deployment">
                        <Input
                            label="Image Name"
                            name="image"
                            ref={register({ required: true })}
                            error={errors.image && 'The image name is required.'}
                        />
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button type="submit" variant="primary">
                                Create
                            </Button>
                            <Button onClick={onClose}>
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
}
