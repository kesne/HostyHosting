import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Environment } from 'relay-runtime';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import Layout from './components/Layout';
import Home from './components/Home';
import Auth from './components/Auth';
import Invite from './components/Auth/Invite';
import Application from './components/Application';
import PrivateRoute from './components/PrivateRoute';
import Account from './components/Account';
import GrantAPIKey from './components/Auth/GrantAPIKey';
import IndexRedirect from './components/IndexRedirect';
import FourOhFour from './components/404';
import { createEnvironment } from './utils/environment';
import { useHasUser } from './utils/user';

export default function App() {
    const hasUser = useHasUser();
    const [prevHasUser, setPrevHasUser] = useState(hasUser);
    const environmentRef = useRef<Environment>();

    useEffect(() => {
        setPrevHasUser(hasUser);
    }, [hasUser]);

    if (
        // If we do not have an environment...
        !environmentRef.current ||
        // Or if the user state has changed (signed in or signed out)...
        hasUser !== prevHasUser
    ) {
        environmentRef.current = createEnvironment();
    }

    return (
        <RelayEnvironmentProvider environment={environmentRef.current}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <PrivateRoute path="/" element={<IndexRedirect />} />
                        <PrivateRoute path="/orgs/:organization/*" element={<Home />} />
                        <PrivateRoute
                            path="/orgs/:organization/apps/:application/*"
                            element={<Application />}
                        />
                        <PrivateRoute path="/grant/:uuid" element={<GrantAPIKey />} />
                        <PrivateRoute path="/auth/*" unauthenticated element={<Auth />} />
                        <PrivateRoute path="/account/*" element={<Account />} />
                        <Route path="/invite/:uuid">
                            <Invite />
                        </Route>
                        <Route path="*">
                            <FourOhFour />
                        </Route>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </RelayEnvironmentProvider>
    );
}
