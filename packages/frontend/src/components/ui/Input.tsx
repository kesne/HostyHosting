import React, { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import FormItem from './FormItem';

type Props = { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, Props>(({ label, error, ...props }, ref) => {
    return (
        <FormItem label={label} error={error}>
            <input
                className={clsx('form-input block w-full sm:text-sm sm:leading-5', {
                    'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': error
                })}
                ref={ref}
                {...props}
            />
            {error && (
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
