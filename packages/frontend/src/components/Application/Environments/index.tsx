import React from 'react';
import Card, { CardContent } from '../../ui/Card';
import Button from '../../ui/Button';

export default function Environments() {
    return (
        <Card title="Environments" actions={<Button variant="primary">Create</Button>}>
            <CardContent>Stuff here</CardContent>
        </Card>
    );
}
