import React, { Suspense } from 'react';
import Header from './Header';
import Card from './ui/placeholder/Card';
import Container from './ui/Container';

function RoutePlaceholder() {
    return (
        <Container className="mt-6">
            <Card />
        </Container>
    );
}

export default function Layout({ children }: { children: any }) {
    return (
        <div className="bg-gray-100">
            <div className="min-h-screen flex flex-col">
                <Header />
                <Suspense fallback={<RoutePlaceholder />}>{children}</Suspense>
            </div>
        </div>
    );
}
