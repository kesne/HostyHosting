import React from 'react';
import tokenInputRules from '../../utils/tokenInputRules';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useMutation, graphql } from 'react-relay/hooks';
import { VerifyTOTPMutation } from './__generated__/VerifyTOTPMutation.graphql';

type Props = {
    onSignIn(): void;
};

export default function VerifyTOTP({ onSignIn }: Props) {
    const { register, errors, handleSubmit } = useForm();

    const [commit, isInFlight] = useMutation<VerifyTOTPMutation>(graphql`
        mutation VerifyTOTPMutation($token: String!) {
            exchangeTOTP(token: $token) {
                ok
            }
        }
    `);

    function handleFinish(values: Record<string, any>) {
        commit({
            variables: {
                token: values.token,
            },
            onCompleted() {
                onSignIn();
            },
        });
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit(handleFinish)}>
            <p className="text-sm leading-5 text-gray-700">
                Two factor auth is enabled on this account. Please enter the token from your
                authenticator app below:
            </p>

            <Input
                label="Token"
                name="token"
                ref={register(tokenInputRules)}
                errors={errors}
                disabled={isInFlight}
                autoFocus
            />

            <Button variant="primary" type="submit" disabled={isInFlight} fullWidth>
                Verify Two Factor Auth
            </Button>
        </form>
    );
}
