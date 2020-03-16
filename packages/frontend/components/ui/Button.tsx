import { Children, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'default' | 'danger';
};

export function ButtonGroup({ children }: { children: React.ReactNode }) {
    return (
        <>
            {Children.map(children, (child, i) => (
                <span
                    className={clsx('flex w-full sm:ml-3 sm:w-auto', {
                        'sm:ml-3': i === Children.count(children),
                        'mt-3 sm:mt-0': i !== 0
                    })}
                >
                    {child}
                </span>
            ))}
        </>
    );
}

// TODO: Size + responsive button (larger on small screens)
export default function Button({ className, variant = 'default', ...props }: Props) {
    return (
        <button
            type="button"
            className={clsx(
                'relative inline-flex items-center px-4 py-2 border text-base leading-6 rounded-md transition ease-in-out duration-150',
                {
                    'border-transparent text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700':
                        variant === 'primary',
                    'border-gray-300 bg-white text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline':
                        variant === 'default',
                    'border-transparent bg-red-600 text-white hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red':
                        variant === 'danger'
                },
                className
            )}
            {...props}
        />
    );
}
