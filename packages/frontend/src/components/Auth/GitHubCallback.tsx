import React, { useEffect } from 'react';
import Container from './Container';
import { useLocation, Navigate } from 'react-router-dom';
import { useGitHubSignInMutation } from '../../queries';

export default function GitHubCallback() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [signIn, { data }] = useGitHubSignInMutation({
        variables: {
            code: query.get('code')!,
        },
    });

    useEffect(() => {
        signIn();
    }, []);

    if (data) {
        return <Navigate to="/" />;
    }

    return <Container title="Signing In...">We are completing your GitHub signin...</Container>;
}
