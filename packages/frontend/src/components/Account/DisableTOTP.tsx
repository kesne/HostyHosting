import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, graphql } from 'react-relay/hooks';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button, { ButtonGroup } from '../ui/Button';
import Input from '../ui/Input';
import { DisableTOTPMutation } from './__generated__/DisableTOTPMutation.graphql';

type Props = {
    visible: boolean;
    onClose(): void;
};

export default function DisableTOTP({ visible, onClose }: Props) {
    const { register, errors, reset, handleSubmit } = useForm();

    const [commit, isInFlight] = useMutation<DisableTOTPMutation>(graphql`
        mutation DisableTOTPMutation($password: String!) {
            disableTotp(password: $password) {
                ok
            }
        }
    `);

    useEffect(() => {
        if (visible) {
            reset();
        }
    }, [visible]);

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
            <form onSubmit={handleSubmit(handleOk)}>
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
                        ref={register({ required: true })}
                        errors={errors}
                        disabled={isInFlight}
                        autoFocus
                    />
                </ModalContent>
                <ModalFooter>
                    <ButtonGroup>
                        <Button type="submit" variant="primary" disabled={isInFlight}>
                            Disable
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ButtonGroup>
                </ModalFooter>
            </form>
        </Modal>
    );
}
