import React, { useEffect } from 'react';
import Container from './Container';
import { useLocation } from 'react-router-dom';
import { useGitHubSignInMutation } from '../../queries';

export default function GitHubCallback() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [signIn] = useGitHubSignInMutation({
        variables: {
            code: query.get('code')!,
        },
    });

    useEffect(() => {
        signIn();
    }, []);

    return <Container title="Signing In...">We are completing your github signin...</Container>;
}
