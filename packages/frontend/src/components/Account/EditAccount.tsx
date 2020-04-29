import React from 'react';
import { useUpdateAccountMutation, useMeDaddyQuery } from '../../queries';
import Spinner from '../Spinner';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card, { CardContent } from '../ui/Card';

export default function EditAccount() {
    const { data, loading } = useMeDaddyQuery();
    const [updateAccount, updateAccountState] = useUpdateAccountMutation();

    const { register, errors, handleSubmit } = useForm();

    function handleFinish(values: Record<string, any>) {
        updateAccount({
            variables: {
                username: values.username,
                name: values.name,
                email: values.email,
            },
        });
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <Card>
            <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit(handleFinish)}>
                    <Input
                        label="Username"
                        name="username"
                        disabled={updateAccountState.loading}
                        defaultValue={data?.me.username}
                        ref={register({ required: true })}
                        errors={errors}
                    />
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
                        <Button
                            disabled={updateAccountState.loading}
                            variant="primary"
                            type="submit"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
