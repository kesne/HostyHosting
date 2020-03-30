import React from 'react';
import Container from '../ui/Container';
import Link from '../ui/Link';

export default function FourOhFour() {
    return (
        <Container>
            <div className="mt-6">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                    Page not found.
                </h2>
                <p className="my-4 text-gray-900">The page you're looking could not be found.</p>
                <Link to="/">Go back home</Link>
            </div>
        </Container>
    );
}
