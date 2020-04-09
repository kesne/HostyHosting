import React from 'react';
import Delete from './Delete';
import Information from './Information';
import Region from './Region';
import { useApplicationID } from '../ApplicationContext';
import { useApplicationQuery } from '../../../queries';
import { EnterContainer } from '../../ui/motion/Enter';

export default function Settings() {
    const id = useApplicationID();
    const { data } = useApplicationQuery({ variables: { id } });

    // TODO:
    if (!data) {
        return null;
    }

    return (
        <EnterContainer>
            <Region title="Information" first>
                <Information application={data.application} />
            </Region>
            <Region title="App Management">
                <Delete application={data.application} />
            </Region>
        </EnterContainer>
    );
}
