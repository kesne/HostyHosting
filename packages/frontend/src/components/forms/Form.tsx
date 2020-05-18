import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
import DisabledContext from './utils/DisabledContext';

type Values = Record<string, string>;

type Props<T> = {
    onSubmit(values: T): void | Promise<void>;
    children: React.ReactNode;
    disabled?: boolean;
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

export default function Form<T = Values>({
    children,
    onSubmit,
    disabled = false,
    ...props
}: Props<T>) {
    const form = useForm<T>();

    return (
        <DisabledContext.Provider value={disabled}>
            <FormContext {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
                    {children}
                </form>
            </FormContext>
        </DisabledContext.Provider>
    );
}
