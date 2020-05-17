import React, { useState } from 'react';
import useBoolean from '../../../utils/useBoolean';
import Modal, { ModalContent, ModalFooter } from '../../ui/Modal';
import Button, { ButtonGroup } from '../../ui/Button';
import Input from '../../ui/Input';
import { useNavigate } from 'react-router-dom';
import { useFragment, graphql, useMutation } from 'react-relay/hooks';
import { Delete_application$key } from './__generated__/Delete_application.graphql';
import { DeleteApplicationMutation } from './__generated__/DeleteApplicationMutation.graphql';

export type Props = {
    application: Delete_application$key;
};

export default function Delete({ application }: Props) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [visible, { on, off }] = useBoolean(false);

    const data = useFragment(
        graphql`
            fragment Delete_application on Application {
                id
                name
            }
        `,
        application,
    );

    const [commit, isInFlight] = useMutation<DeleteApplicationMutation>(graphql`
        mutation DeleteApplicationMutation($application: ID!) {
            application(id: $application) {
                delete {
                    id
                }
            }
        }
    `);

    function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        commit({
            variables: {
                application: data.id,
            },
            onCompleted() {
                // TODO: Find a better place to go to:
                navigate('/', { replace: true });
            },
        });
    }

    return (
        <>
            <Button variant="danger" onClick={on}>
                Delete Application
            </Button>
            <p>Deleting the application can not be undone.</p>
            <Modal open={visible} onClose={off}>
                <form onSubmit={handleDelete}>
                    <ModalContent title="Delete Application">
                        <p className="text-gray-800 mb-4 leading-5">
                            Are you sure that you want to delete this application? All associated
                            routes, deployments, and containers in the application will be
                            immediately stopped. This can not be undone.
                        </p>

                        <p className="text-gray-800 mb-4 leading-5">
                            To confirm you wish to delete this application, please enter the full{' '}
                            <b>Application Name</b> below.
                        </p>

                        <Input
                            label="Application Name"
                            name="name"
                            placeholder={data.name}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button
                                type="submit"
                                variant="danger"
                                disabled={isInFlight || name !== data.name}
                            >
                                Delete
                            </Button>
                            <Button onClick={off}>Cancel</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
}
