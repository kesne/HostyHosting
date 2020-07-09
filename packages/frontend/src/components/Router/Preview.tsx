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

    if (!data.component.containerGroup) {
        return (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex flex-col items-center space-y-2">
                <div className="text-sm text-center text-yellow-900">There are no deployed containers matching the criteria.</div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-gray-100 rounded-lg flex flex-col items-center space-y-2">
            <div className="font-mono text-lg text-gray-900">{`https://${domain}${
                pathPrefix ? `/${pathPrefix}` : ''
            }`}</div>
            <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 text-gray-500"
            >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
            <div className="font-mono text-lg text-gray-900">
                {data.component.containerGroup?.dnsName}
                {forwardPathPrefix && pathPrefix && `/${pathPrefix}`}
            </div>
        </div>
    );
}

export default function Preview(props: Props) {
    if (!props.component || !props.environment || !props.domain) {
        return <div className="text-center text-3xl font-bold text-gray-200">...</div>;
    }

    return <PreviewWithData {...props} />;
}
