import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useHasUser } from '../utils/user';

type Props = {
    unauthenticated?: boolean;
} & RouteProps;

export default function PrivateRoute({ children, unauthenticated, ...rest }: Props) {
    const hasUser = useHasUser();

    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (hasUser && unauthenticated) {
                    return <Redirect to="/" />;
                }
                if (!hasUser && !unauthenticated) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/auth/sign-in',
                                state: { from: location }
                            }}
                        />
                    );
                }

                return children;
            }}
        />
    );
}
