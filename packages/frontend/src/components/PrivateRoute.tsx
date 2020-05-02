import React from 'react';
import { Route, RouteProps, Navigate, useLocation } from 'react-router-dom';
import { getHasUser } from '../utils/user';

type Props = {
    unauthenticated?: boolean;
} & RouteProps;

function RouteElement({ element, unauthenticated }: { element?: React.ReactElement, unauthenticated?: boolean }) {
    const location = useLocation();
    const hasUser = getHasUser();

    if (hasUser && unauthenticated) {
        return <Navigate to="/" />;
    }

    if (!hasUser && !unauthenticated) {
        return (
            <Navigate
                to={{
                    pathname: '/auth/sign-in',
                    state: { from: location.pathname }
                }}
            />
        );
    }

    return element ?? null;
}

export default function PrivateRoute({ element, unauthenticated, ...rest }: Props) {
    return (
        <Route
            {...rest}
            element={<RouteElement element={element} unauthenticated={unauthenticated} />}
        />
    );
}
