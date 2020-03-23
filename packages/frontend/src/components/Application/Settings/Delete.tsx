import React, { useState } from 'react';
import useBoolean from '../../../utils/useBoolean';
import { Application, useDeleteApplicationMutation } from '../../../queries';
import Modal, { ModalContent, ModalFooter } from '../../ui/Modal';
import Button, { ButtonGroup } from '../../ui/Button';
import Input from '../../ui/Input';
import { Redirect } from 'react-router-dom';

export type Props = {
    application: Pick<Application, 'id' | 'name'>;
};

export default function Delete({ application }: Props) {
    const [name, setName] = useState('');
    const [visible, { on, off }] = useBoolean(false);
    const [deleteApplication, { loading, data }] = useDeleteApplicationMutation({
        variables: {
            id: application.id
        }
    });

    function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        deleteApplication();
    }

    if (data) {
        return <Redirect to="/" />;
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

                        <div className="flex items-center">
                            <div className="flex-1">
                                <Input
                                    label="Application Name"
                                    name="name"
                                    placeholder={application.name}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="ml-6">
                                <img src="/static/images/destroy.png" width={100} />
                            </div>
                        </div>
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button
                                type="submit"
                                variant="danger"
                                disabled={loading || name !== application.name}
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
