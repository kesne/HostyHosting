import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import getError from './util/getError';

export type Props = {
    label: string;
    error?: string;
    errors?: Record<string, FieldError>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, Props>(({ label, error, errors, ...props }, ref) => {
    const errorMessage = getError({ name: props.name, error, errors });

    return (
        <div>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    ref={ref}
                    {...props}
                />
                <span className="ml-2 text-sm leading-5 text-gray-900">{label}</span>
            </label>
            {typeof error !== 'undefined' && (
                <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}
        </div>
    );
});
