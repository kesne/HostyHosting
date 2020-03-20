import React, { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import FormItem from './FormItem';

type Props = { label: string; error?: string } & InputHTMLAttributes<HTMLTextAreaElement>;

export default forwardRef<HTMLTextAreaElement, Props>(({ label, error, ...props }, ref) => {
    return (
        <FormItem label={label} error={error}>
            <textarea
                className={clsx('form-textarea block w-full sm:text-sm sm:leading-5', {
                    'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': error
                })}
                ref={ref}
                {...props}
            />
        </FormItem>
    );
});
