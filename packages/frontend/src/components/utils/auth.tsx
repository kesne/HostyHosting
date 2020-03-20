import React from 'react';
import { useHasUser } from './user';
import { Redirect } from 'react-router-dom';

const DEFAULT_SIGNED_OUT = '/auth/sign-in';
const DEFAULT_SIGNED_IN = '/';

function withAuthCreator<T>(requiresAuth: boolean) {
    return (Component: React.ComponentType<T>) => (props: T) => {
        const hasUser = useHasUser();

        if (requiresAuth && !hasUser) {
            return <Redirect to={DEFAULT_SIGNED_OUT} />;
        }

        if (!requiresAuth && hasUser) {
            return <Redirect to={DEFAULT_SIGNED_IN} />
        }

        return <Component {...props} />;
    };
}

export const withAuth = withAuthCreator(true);
export const withNoAuth = withAuthCreator(false);
