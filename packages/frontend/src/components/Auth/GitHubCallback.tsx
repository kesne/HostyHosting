import React, { useEffect } from 'react';
import Container from './Container';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, graphql } from 'react-relay/hooks';

export default function GitHubCallback() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const [commit] = useMutation(graphql`
        mutation GitHubCallbackMutation($code: String!) {
            gitHubSignIn(code: $code) {
                ok
                requiresTOTP
            }
        }
    `);

    useEffect(() => {
        commit({
            variables: {
                code: query.get('code')!,
            },
            onCompleted() {
                navigate('/');
            },
        });
    }, []);

    return <Container title="Signing In...">We are completing your GitHub signin...</Container>;
}
