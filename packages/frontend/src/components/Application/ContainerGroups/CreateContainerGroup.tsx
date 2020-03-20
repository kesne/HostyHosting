import React, { useEffect } from 'react';
import {
    useCreateContainerGroupMutation,
    ApplicationContainerGroupsDocument,
    ApplicationContainerGroupsQuery,
    useApplicationDeploymentsQuery
} from '../../../queries';
import { useApplicationID } from '../ApplicationContext';
import produce from 'immer';
import { useForm } from 'react-hook-form';
import Modal, { ModalContent, ModalFooter } from '../../ui/Modal';
import Button, { ButtonGroup } from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';

type Props = {
    visible: boolean;
    onClose(): void;
};

export default function CreateContainer({ visible, onClose }: Props) {
    const applicationID = useApplicationID();
    const { register, handleSubmit, errors, reset } = useForm();

    const deploymentsState = useApplicationDeploymentsQuery({
        variables: {
            id: applicationID
        }
    });

    const [createContainerGroup, { loading, data }] = useCreateContainerGroupMutation({
        update(cache, { data }) {
            if (!data) return;

            // Read the data from our cache for this query.
            const { application } =
                cache.readQuery<ApplicationContainerGroupsQuery>({
                    query: ApplicationContainerGroupsDocument,
                    variables: { id: applicationID }
                }) ?? {};

            const nextApplication = produce(application, draftState => {
                draftState?.containerGroups.push(data.application.createContainerGroup);
            });

            cache.writeQuery({
                query: ApplicationContainerGroupsDocument,
                variables: { id: applicationID },
                data: { application: nextApplication }
            });
        }
    });

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

    async function handleOk(data: Record<string, string>) {
        await createContainerGroup({
            variables: {
                applicationID,
                label: data.label,
                deployment: Number(data.deployment),
                size: Number(data.size),
                number: Number(data.number)
            }
        });
    }

    console.log(errors);

    return (
        <Modal open={visible} onClose={onClose}>
            <form onSubmit={handleSubmit(handleOk)}>
                <ModalContent title="Create Container">
                    <p className="text-gray-800 text-sm font-normal mb-4">
                        Select the size of the container, and the number of containers that you
                        would like to deploy. The size of the container can <strong>not</strong> be
                        changed after it is created. The number of deployments can be changed at any
                        time.
                    </p>
                    <div className="grid grid-cols-1 row-gap-6">
                        <Input
                            name="label"
                            label="Label"
                            ref={register({ required: true })}
                            error={errors.label && 'The image name is required.'}
                        />
                        <Select
                            defaultValue=""
                            name="deployment"
                            label="Deployment"
                            ref={register({ required: true })}
                            error={errors.deployment && 'The image name is required.'}
                        >
                            <option value="" disabled>
                                Select a deployment...
                            </option>
                            {deploymentsState.data?.application.deployments.map(deployment => (
                                <option key={deployment.id} value={deployment.id}>
                                    {deployment.image}
                                </option>
                            ))}
                        </Select>
                        TODO: Put slider replacement here!
                        {/*
                    <Form.Item name="size" label="Container Size">
                        <Slider
                            defaultValue={1}
                            min={1}
                            max={5}
                            tooltipVisible={false}
                            tooltipPlacement="bottom"
                            marks={{
                                1: '1x',
                                2: '2x',
                                3: '3x',
                                4: '4x',
                                5: '5x'
                            }}
                        />
                    </Form.Item> */}
                        <Input
                            defaultValue={1}
                            type="number"
                            name="number"
                            label="Number of Containers"
                            ref={register({
                                required: { value: true, message: 'This field is required.' },
                                min: { value: 1, message: 'You must deploy at least 1 container.' },
                                max: {
                                    value: 10,
                                    message: 'You cannot deploy more than 10 containers.'
                                }
                            })}
                            error={errors.number && errors.number.message}
                        />
                    </div>
                </ModalContent>
                <ModalFooter>
                    <ButtonGroup>
                        <Button type="submit" variant="primary" modal>
                            Create
                        </Button>
                        <Button modal onClick={onClose}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </form>
        </Modal>
    );
}
