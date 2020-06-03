import React from 'react';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { PreviewQuery } from './__generated__/PreviewQuery.graphql';

type Props = {
    domain?: string;
    pathPrefix?: string;
    forwardPathPrefix?: boolean;
    component?: string;
    environment?: string;
};

function PreviewWithData({
    component,
    environment,
    domain,
    pathPrefix,
    forwardPathPrefix,
}: Required<Props>) {
    const data = useLazyLoadQuery<PreviewQuery>(
        graphql`
            query PreviewQuery($component: ID!, $environment: ID!) {
                component(id: $component) {
                    containerGroup(environment: $environment) {
                        id
                        dnsName
                    }
                }
            }
        `,
        {
            component,
            environment,
        },
    );

    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            <div>FROM: {`https://${domain}/${pathPrefix ?? ''}`}</div>
            <div>
                TO: {data.component.containerGroup?.dnsName}/{forwardPathPrefix ? pathPrefix : ''}
            </div>
        </div>
    );
}

export default function Preview(props: Props) {
    if (!props.component || !props.environment || !props.domain) {
        return <div>Pls wait</div>;
    }

    return <PreviewWithData {...props} />;
}
