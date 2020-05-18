import React from 'react';
import { useMutation, graphql } from 'react-relay/hooks';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button, { ButtonGroup } from '../ui/Button';
import Input from '../forms/Input';
import { DisableTOTPMutation } from './__generated__/DisableTOTPMutation.graphql';
import Form from '../forms/Form';
import SubmitButton from '../forms/SubmitButton';

type Props = {
    visible: boolean;
    onClose(): void;
};

export default function DisableTOTP({ visible, onClose }: Props) {
    const [commit, isInFlight] = useMutation<DisableTOTPMutation>(graphql`
        mutation DisableTOTPMutation($password: String!) {
            disableTotp(password: $password) {
                ok
            }
        }
    `);

    function handleOk(values: Record<string, string>) {
        commit({
            variables: {
                password: values.password,
            },
            onCompleted() {
                onClose();
            },
        });
    }

    return (
        <Modal open={visible} onClose={onClose}>
            <Form onSubmit={handleOk} disabled={isInFlight}>
                <ModalContent title="Disable Two Factor Authentication">
                    <p className="text-gray-800 text-sm font-normal mb-4">
                        Please enter your password to disable two-factor authentication on your
                        account.
                    </p>
                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Password..."
                        register={{ required: true }}
                        autoFocus
                    />
                </ModalContent>
                <ModalFooter>
                    <ButtonGroup>
                        <SubmitButton>
                            Disable
                        </SubmitButton>
                        <Button onClick={onClose}>Cancel</Button>
                    </ButtonGroup>
                </ModalFooter>
            </Form>
        </Modal>
    );
}
