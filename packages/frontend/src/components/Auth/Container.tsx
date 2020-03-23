import React from 'react';

type Props = {
    title: string;
    subtitle?: React.ReactNode;
    children: NonNullable<React.ReactNode>;
};

export default function Container({ title, subtitle, children }: Props) {
    return (
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    {title}
                </h2>
                {subtitle && (
                    <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">{children}</div>
            </div>
        </div>
    );
}
