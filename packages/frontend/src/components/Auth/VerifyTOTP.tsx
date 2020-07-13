import React from 'react';
import tokenInputRules from '../../utils/tokenInputRules';
import { useMutation, graphql } from 'react-relay/hooks';
import { VerifyTOTPMutation } from './__generated__/VerifyTOTPMutation.graphql';
import Form from '../forms/Form';
import Input from '../forms/Input';
import SubmitButton from '../forms/SubmitButton';

type Props = {
    onSignIn(): void;
};

export default function VerifyTOTP({ onSignIn }: Props) {
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
        <Form autoComplete="on" className="space-y-6" onSubmit={handleFinish} disabled={isInFlight}>
            <p className="text-sm leading-5 text-gray-700">
                Two factor auth is enabled on this account. Please enter the token from your
                authenticator app below:
            </p>

            <Input label="Token" name="token" autoComplete="one-time-code" register={tokenInputRules} autoFocus />

            <SubmitButton fullWidth>Verify Two Factor Auth</SubmitButton>
        </Form>
    );
}
