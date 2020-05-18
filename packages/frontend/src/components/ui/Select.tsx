import React, { forwardRef, SelectHTMLAttributes } from 'react';
import FormItem from './FormItem';
import { FieldError } from 'react-hook-form';
import getError from './util/getError';

export type Props = {
    label: string;
    children: React.ReactNode;
    error?: string;
    errors?: Record<string, FieldError>;
} & SelectHTMLAttributes<HTMLSelectElement>;

export default forwardRef<HTMLSelectElement, Props>(
    ({ label, error, errors, children, ...props }, ref) => {
        const errorMessage = getError({ name: props.name, error, errors });

        return (
            <FormItem label={label} error={errorMessage}>
                <select
                    ref={ref}
                    className="block form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    {...props}
                >
                    {children}
                </select>
            </FormItem>
        );
    }
);
