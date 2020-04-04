import React from 'react';
import { Component as ComponentData } from '../../../../queries';
import DeleteComponent from './DeleteComponent';

type Props = {
    component: Pick<ComponentData, 'id' | 'image'>;
};

export default function Component({ component }: Props) {
    return (
        <div>
            <p>{component.image}</p>
            <DeleteComponent id={component.id} />
        </div>
    );
}
