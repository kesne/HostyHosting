import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

export default function IconButton({ children, ...props }: Props) {
    return (
        <button className="focus:outline-none p-2 hover:bg-gray-200 hover:text-indigo-600 rounded-full transition duration-300 ease-in-out" {...props}>
            {children}
        </button>
    );
}
