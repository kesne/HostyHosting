import React, { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import FormItem from './FormItem';

type FieldError = {
    type: string;
    message?: string;
};

type Props = {
    label: string;
    error?: string;
    errors?: Record<string, FieldError>;
} & InputHTMLAttributes<HTMLInputElement>;

function getErrorMessage(error?: FieldError) {
    if (!error) {
        return undefined;
    }

    if (error.message) {
        return error.message;
    }

    if (error.type === 'required') {
        return 'This field is required.';
    }

    return '';
}

export default forwardRef<HTMLInputElement, Props>(({ label, error, errors, ...props }, ref) => {
    const errorForField = error ?? getErrorMessage(errors?.[props.name ?? '']);
    const hasError = typeof errorForField !== 'undefined';

    return (
        <FormItem label={label} error={errorForField}>
            <input
                className={clsx(
                    'form-input block w-full sm:text-sm sm:leading-5',
                    hasError &&
                        'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red',
                    props.disabled && 'bg-gray-100'
                )}
                ref={ref}
                {...props}
            />
            {hasError && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            )}
        </FormItem>
    );
});
