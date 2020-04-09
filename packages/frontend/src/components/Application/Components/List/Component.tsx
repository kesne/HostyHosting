import React from 'react';
import { Component as ComponentData } from '../../../../queries';

type Props = {
    component: Pick<ComponentData, 'id' | 'name'>;
};

export default function Component({ component }: Props) {
    return (
        <div>
            <p>{component.name}</p>
        </div>
    );
}
