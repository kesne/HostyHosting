import React from 'react';
import { useLazyLoadQuery, graphql, useMutation } from 'react-relay/hooks';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import tokenInputRules from '../../utils/tokenInputRules';
import SuspenseImage from '../SuspenseImage';
import { ModalContent, ModalFooter } from '../ui/Modal';
import Button, { ButtonGroup } from '../ui/Button';
import { OnboardTOTPContentQuery } from './__generated__/OnboardTOTPContentQuery.graphql';
import { OnboardTOTPContentMutation } from './__generated__/OnboardTOTPContentMutation.graphql';

type Props = {
    onClose(): void;
};

export default function OnboardTOTPContent({ onClose }: Props) {
    const { register, errors, handleSubmit } = useForm();

    const data = useLazyLoadQuery<OnboardTOTPContentQuery>(
        graphql`
            query OnboardTOTPContentQuery {
                me {
                    id
                    name
                    onboardTOTP
                }
            }
        `,
        {},
        {
            fetchPolicy: 'network-only',
        },
    );

    const [commit, isInFlight] = useMutation<OnboardTOTPContentMutation>(graphql`
        mutation OnboardTOTPContentMutation($secret: String!, $token: String!) {
            enableTotp(secret: $secret, token: $token) {
                ok
            }
        }
    `);

    function handleOk(values: Record<string, string>) {
        commit({
            variables: {
                token: values.token,
                secret: data.me.onboardTOTP,
            },
            onCompleted() {
                onClose();
            },
        });
    }

    const OTP_DATA = data ? `otpauth://totp/${data.me.name}?secret=${data.me.onboardTOTP}` : '';

    return (
        <form onSubmit={handleSubmit(handleOk)}>
            <ModalContent title="Enable Two-Factor Authentication">
                <p className="text-gray-800 text-sm font-normal mb-4">
                    Scan this QR code in an authenticator app to enable Two Factor Authentication.
                    This will require you to enter a token from the authenticator app every time you
                    sign in.
                </p>
                <SuspenseImage
                    alt="Enable Two Factor Authentication"
                    src={`https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${OTP_DATA}`}
                    className="shadow-lg block mx-auto my-6 rounded"
                    style={{ height: 166, width: 166 }}
                />
                <div className="text-gray-600 text-sm text-center">
                    Or enter it manually:
                    <br />
                    <div className="mt-2 mb-6">
                        <span className="px-2 py-1 border border-gray-200 bg-gray-100 font-mono leading-tight rounded">
                            {data.me.onboardTOTP}
                        </span>
                    </div>
                </div>
                <Input
                    label="6 digit code"
                    type="number"
                    name="token"
                    errors={errors}
                    ref={register(tokenInputRules)}
                    disabled={isInFlight}
                    autoFocus
                />
            </ModalContent>
            <ModalFooter>
                <ButtonGroup>
                    <Button variant="primary" type="submit" disabled={isInFlight}>
                        Enable
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ButtonGroup>
            </ModalFooter>
        </form>
    );
}
