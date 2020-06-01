import React from 'react';
import Card from '../ui/placeholder/Card';
import Text from '../ui/placeholder/Text';

export default function Loader() {
    return (
        <Card>
            <Text className="w-3/5" />
            <Text className="w-2/5" />
            <Text className="w-2/3" />
        </Card>
    );
}
