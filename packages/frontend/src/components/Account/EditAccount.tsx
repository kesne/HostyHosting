import React from 'react';
import { useUpdateAccountMutation, useMeQuery } from '../../queries';
import Spinner from '../Spinner';
import { useForm } from 'react-hook-form';
import Button from '@daas/ui/Button';
import Input from '@daas/ui/Input';

export default function EditAccount() {
    const { data, loading } = useMeQuery();
    const [updateAccount, updateAccountState] = useUpdateAccountMutation();

    const { register, errors, handleSubmit } = useForm();

    function handleFinish(values: Record<string, any>) {
        updateAccount({
            variables: {
                name: values.name,
                email: values.email
            }
        });
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <form className="grid grid-cols-1 row-gap-6" onSubmit={handleSubmit(handleFinish)}>
            <Input
                label="Name"
                name="name"
                disabled={updateAccountState.loading}
                defaultValue={data?.me.name}
                ref={register({ required: true })}
                errors={errors}
            />
            <Input
                label="Email"
                name="email"
                disabled={updateAccountState.loading}
                defaultValue={data?.me.email}
                ref={register({ required: true })}
                errors={errors}
            />

            <div>
                <Button disabled={updateAccountState.loading} variant="primary" type="submit">
                    Save Changes
                </Button>
            </div>
        </form>
    );
}
