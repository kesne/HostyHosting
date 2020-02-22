import { useEffect } from 'react';
import Router from 'next/router';
import { useHasUser } from './user';

const DEFAULT_SIGNED_OUT = '/';
const DEFAULT_SIGNED_IN = '/account';

function withAuthCreator<T>(requiresAuth: boolean) {
    return (Component: React.ComponentType<T>) => (props: T) => {
        const hasUser = useHasUser();

        useEffect(() => {
            if (requiresAuth && !hasUser) {
                Router.push(DEFAULT_SIGNED_OUT);
            } else if (!requiresAuth && hasUser) {
                Router.push(DEFAULT_SIGNED_IN);
            }
        }, [hasUser]);

        if ((requiresAuth && !hasUser) || (!requiresAuth && hasUser)) {
            return null;
        }

        return <Component {...props} />;
    };
}

export const withAuth = withAuthCreator(true);
export const withNoAuth = withAuthCreator(false);
