import React, { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import Header from './Header';
import environment from '../utils/environment';

// TODO: Hoist some of this into the true app, out of the layout.
export default function App({ children }: { children: any }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <RelayEnvironmentProvider environment={environment}>
                <Suspense fallback="TODO: REMOVE THIS BEFORE SHIPPING ANYTHING">
                    <div className="flex flex-col">
                        <Header />
                        {children}
                    </div>
                </Suspense>
            </RelayEnvironmentProvider>
        </div>
    );
}
