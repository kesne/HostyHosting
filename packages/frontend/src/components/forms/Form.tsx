import React from 'react';
import { useForm, FormContext, DeepPartial } from 'react-hook-form';
import DisabledContext from './utils/DisabledContext';

type Values = Record<string, any>;

type Props<T> = {
    onSubmit(values: T): void | Promise<void>;
    children: React.ReactNode;
    disabled?: boolean;
    defaultValues?: DeepPartial<T>;
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

export default function Form<T = Values>({
    children,
    onSubmit,
    defaultValues,
    autoComplete,
    disabled = false,
    ...props
}: Props<T>) {
    const form = useForm<T>({
        defaultValues,
        // TODO: Look into if this is really what we want, or if we want it to
        // be defined form-by-form.
        mode: 'onChange',
    });

    return (
        <DisabledContext.Provider value={disabled}>
            <FormContext {...form}>
                <form
                    autoComplete={autoComplete ?? 'off'}
                    onSubmit={form.handleSubmit(onSubmit)}
                    {...props}
                >
                    {children}
                </form>
            </FormContext>
        </DisabledContext.Provider>
    );
}
