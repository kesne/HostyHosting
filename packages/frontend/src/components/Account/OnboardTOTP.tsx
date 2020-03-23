import React, { useEffect, useState } from 'react';
import { useOnboardTotpLazyQuery, useEnableTotpMutation } from '../../queries';
import { useForm } from 'react-hook-form';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button, { ButtonGroup } from '../ui/Button';
import Input from '../ui/Input';
import tokenInputRules from '../../utils/tokenInputRules';

type Props = {
    visible: boolean;
    onClose(): void;
};

export default function OnboardTOTP({ visible, onClose }: Props) {
    const [imageRendering, setImageRendering] = useState(false);
    const { reset, register, errors, handleSubmit } = useForm();
    const [fetchOnboardTOTP, { data, error, loading }] = useOnboardTotpLazyQuery({
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true
    });

    const [enableTotp, totpEnableState] = useEnableTotpMutation();

    useEffect(() => {
        if (visible) {
            reset();
            fetchOnboardTOTP();
            setImageRendering(false);
        }
    }, [visible]);

    async function handleOk(values: Record<string, string>) {
        await enableTotp({
            variables: {
                token: String(values.token),
                secret: data?.me.onboardTOTP ?? ''
            }
        });
    }

    useEffect(() => {
        if (totpEnableState.data) {
            onClose();
        }
    }, [totpEnableState.data, onClose]);

    const OTP_DATA = data ? `otpauth://totp/${data.me.name}?secret=${data.me.onboardTOTP}` : '';

    useEffect(() => {
        if (!visible) {
            return;
        }

        const timeout = setTimeout(() => {
            setImageRendering(true);
        }, 300);

        return () => {
            clearTimeout(timeout);
        };
    }, [visible]);

    return (
        <Modal open={visible} onClose={onClose}>
            <form onSubmit={handleSubmit(handleOk)}>
                <ModalContent title="Enable Two-Factor Authentication">
                    <p className="text-gray-800 text-sm font-normal mb-4">
                        Scan this QR code in an authenticator app to enable Two Factor
                        Authentication. This will require you to enter a token from the
                        authenticator app every time you sign in.
                    </p>
                    {imageRendering ? (
                        <img
                            alt="Enable Two Factor Authentication"
                            src={`https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${OTP_DATA}`}
                            className="shadow-lg block mx-auto my-6 rounded"
                            style={{ height: 166, width: 166 }}
                        />
                    ) : (
                        <div
                            className="shadow-lg mx-auto my-6 rounded bg-gray-50"
                            style={{ height: 166, width: 166 }}
                        />
                    )}
                    <div className="text-gray-600 text-sm text-center">
                        Or enter it manually:
                        <br />
                        <div className="mt-2 mb-6">
                            <span className="px-2 py-1 border border-gray-200 bg-gray-100 font-mono leading-tight rounded">
                                {data?.me.onboardTOTP}
                            </span>
                        </div>
                    </div>
                    <Input
                        label="6 digit code"
                        type="number"
                        name="token"
                        errors={errors}
                        ref={register(tokenInputRules)}
                    />
                </ModalContent>
                <ModalFooter>
                    <ButtonGroup>
                        <Button variant="primary" type="submit">
                            Enable
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ButtonGroup>
                </ModalFooter>
            </form>
        </Modal>
    );
}
