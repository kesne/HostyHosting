import React from 'react';
import Card from '../../../ui/placeholder/Card';
import Text from '../../../ui/placeholder/Text';

export default function ContainerGroupLoading() {
    return (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Card>
                <Text className="w-1/5" />
                <Text className="w-3/5" />
            </Card>
            <Card>
                <Text className="w-1/5" />
                <Text className="w-3/5" />
            </Card>
            <Card>
                <Text className="w-1/5" />
                <Text className="w-3/5" />
            </Card>
        </div>
    );
}
