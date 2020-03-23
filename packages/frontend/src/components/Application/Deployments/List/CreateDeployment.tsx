import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    useCreateDeploymentMutation,
    ApplicationDeploymentsQuery,
    ApplicationDeploymentsDocument,
    DeploymentStrategy,
} from '../../../../queries';
import { useApplicationID } from '../../ApplicationContext';
import produce from 'immer';
import Modal, { ModalContent, ModalFooter } from '../../../ui/Modal';
import Input from '../../../ui/Input';
import Button, { ButtonGroup } from '../../../ui/Button';
import Select from '../../../ui/Select';

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
                    variables: { id: applicationID },
                }) ?? {};

            const nextApplication = produce(application, draftState => {
                draftState?.deployments.push(data.application.createDeployment);
            });

            cache.writeQuery({
                query: ApplicationDeploymentsDocument,
                variables: { id: applicationID },
                data: { application: nextApplication },
            });
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
        await createDeployment({
            variables: {
                applicationID,
                image: data.image,
                label: data.label,
                strategy: data.strategy as DeploymentStrategy,
            },
        });
    }

    return (
        <>
            <Modal open={visible} onClose={onClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent title="Create Deployment">
                        <div className="grid grid-cols-1 row-gap-6">
                            <Input
                                label="Label"
                                name="label"
                                ref={register({ required: true })}
                                errors={errors}
                            />
                            <Input
                                label="Image Name"
                                name="image"
                                ref={register({ required: true })}
                                errors={errors}
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
