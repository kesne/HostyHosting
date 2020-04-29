import React, { useEffect } from 'react';
import { useExchangeTotpMutation } from '../../queries';
import tokenInputRules from '../../utils/tokenInputRules';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Props = {
    onSignIn(): void;
};

export default function VerifyTOTP({ onSignIn }: Props) {
    const [exchangeTotp, { data, loading }] = useExchangeTotpMutation();
    const { register, errors, handleSubmit } = useForm();

    useEffect(() => {
        if (data) {
            onSignIn();
        }
    }, [data, onSignIn]);

    function handleFinish(values: Record<string, any>) {
        exchangeTotp({
            variables: {
                token: values.token
            }
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
                autoFocus
            />

            <Button variant="primary" type="submit" disabled={loading} fullWidth>
                Verify Two Factor Auth
            </Button>
        </form>
    );
}
