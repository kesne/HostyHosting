import React from 'react';
import { Link } from 'react-router-dom';

export default function SignedOutHeader() {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 text-white text-lg font-semibold">
                            HostyHosting
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
