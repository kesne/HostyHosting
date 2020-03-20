import React, { forwardRef, SelectHTMLAttributes } from 'react';
import FormItem from './FormItem';

type Props = {
    label: string;
    children: React.ReactNode;
    error?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export default forwardRef<HTMLSelectElement, Props>(({ label, error, children, ...props }, ref) => {
    return (
        <FormItem label={label} error={error}>
            <select
                ref={ref}
                className="block form-select w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                {...props}
            >
                {children}
            </select>
        </FormItem>
    );
});
