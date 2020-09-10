import React from 'react';
import Text from '../ui/placeholder/Text';
import Container from '../ui/placeholder/Container';

export default function PageLoading() {
    return (
        <div>
            <div className="p-6 border-b border-gray-200">
                <Text className="w-48" />
            </div>
            <div className="divide-y divide-gray-200">
                {Array.from({ length: 3 }, (_, i) => (
                    <Container key={i} className="p-6">
                        <Text className="w-36" />
                        <Text className="w-64" />
                    </Container>
                ))}
            </div>
        </div>
    );
}
