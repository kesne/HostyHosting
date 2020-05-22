import React, { Suspense } from 'react';
import Header from './Header';

export default function Layout({ children }: { children: any }) {
    return (
        <div className="bg-gray-100">
            <div className="min-h-screen flex flex-col">
                <Header />
                <Suspense fallback="TODO: REMOVE THIS BEFORE SHIPPING ANYTHING">
                    {children}
                </Suspense>
            </div>
        </div>
    );
}
