import React from 'react';
import { useFragment, graphql } from 'react-relay/hooks';
import { ListItem } from '../../../ui/List';
import { Component_component$key } from './__generated__/Component_component.graphql';

type Props = {
    component: Component_component$key;
};

export default function Component({ component }: Props) {
    const data = useFragment(graphql`
        fragment Component_component on Component {
            id
            name
        }
    `, component);

    return (
        <ListItem key={data.id} to={data.id}>
            <div>
                <p>{data.name}</p>
            </div>
        </ListItem>
    );
}
