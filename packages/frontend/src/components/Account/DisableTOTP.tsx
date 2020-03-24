import React, { useEffect } from 'react';
import { useDisableTotpMutation } from '../../queries';
import Modal, { ModalContent, ModalFooter } from '@daas/ui/Modal';
import Button, { ButtonGroup } from '@daas/ui/Button';
import Input from '@daas/ui/Input';
import { useForm } from 'react-hook-form';

type Props = {
    visible: boolean;
    onClose(): void;
};

export default function DisableTOTP({ visible, onClose }: Props) {
    const [disableTOTP, { data, loading }] = useDisableTotpMutation();
    const { register, errors, reset, handleSubmit } = useForm();

    useEffect(() => {
        if (data) {
            onClose();
        }
    }, [data, onClose]);

    useEffect(() => {
        if (visible) {
            reset();
        }
    }, [visible]);

    async function handleOk(values: Record<string, string>) {
        await disableTOTP({
            variables: {
                password: values.password
            }
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
                        required
                        autoFocus
                    />
                </ModalContent>
                <ModalFooter>
                    <ButtonGroup>
                        <Button type="submit" variant="primary">
                            Disable
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ButtonGroup>
                </ModalFooter>
            </form>
        </Modal>
    );
}
