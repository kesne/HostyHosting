import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { getHasUser } from '../utils/user';

type Props = {
    unauthenticated?: boolean;
} & RouteProps;

export default function PrivateRoute({ children, unauthenticated, ...rest }: Props) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                const hasUser = getHasUser();

                if (hasUser && unauthenticated) {
                    return <Redirect to="/" />;
                }

                if (!hasUser && !unauthenticated) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/auth/sign-in',
                                state: { from: location.pathname }
                            }}
                        />
                    );
                }

                return children;
            }}
        />
    );
}
