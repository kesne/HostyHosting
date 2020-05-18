import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Environment } from 'relay-runtime';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import Layout from './components/Layout';
import Home from './components/Home';
import Auth from './components/Auth';
import Application from './components/Application';
import PrivateRoute from './components/PrivateRoute';
import Account from './components/Account';
import GrantAPIKey from './components/Auth/GrantAPIKey';
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
            <Router>
                <Layout>
                    <Routes>
                        <PrivateRoute path="/" element={<Home />} />
                        <PrivateRoute path="/orgs/:organization" element={<Home />} />
                        <PrivateRoute
                            path="/orgs/:organization/apps/:application/*"
                            element={<Application />}
                        />
                        <PrivateRoute path="/grant/:uuid" element={<GrantAPIKey />} />
                        <PrivateRoute path="/auth/*" unauthenticated element={<Auth />} />
                        <PrivateRoute path="/account/*" element={<Account />} />
                        <Route path="*">
                            <FourOhFour />
                        </Route>
                    </Routes>
                </Layout>
            </Router>
        </RelayEnvironmentProvider>
    );
}
