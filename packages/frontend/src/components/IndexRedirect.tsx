import React from 'react';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { Navigate } from 'react-router-dom';
import { IndexRedirectQuery } from './__generated__/IndexRedirectQuery.graphql';

export default function IndexRedirect() {
    const data = useLazyLoadQuery<IndexRedirectQuery>(
        graphql`
            query IndexRedirectQuery {
                viewer {
                    id
                    username
                }
            }
        `,
        {},
    );

    return <Navigate to={`/orgs/${data.viewer.username}`} />;
}
