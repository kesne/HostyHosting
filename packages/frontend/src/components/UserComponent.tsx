import React from 'react';
import { UserComponent_user$key } from './__generated__/UserComponent_user.graphql';

import { graphql, useFragment } from 'react-relay/hooks';

type Props = {
    user: UserComponent_user$key;
};

function UserComponent(props: Props) {
    const data = useFragment(
        graphql`
            fragment UserComponent_user on User {
                name
            }
        `,
        props.user,
    );

    return (
        <>
            <h1>{data.name}</h1>
            <div>
                <img src={data.profile_picture?.uri} />
            </div>
        </>
    );
}

module.exports = UserComponent;
