import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Auth from './components/Auth';
import Application from './components/Application';
import PrivateRoute from './components/PrivateRoute';
import Account from './components/Account';

export default function App() {
    return (
        <Layout>
            <Router>
                <Switch>
                    <PrivateRoute path="/" exact>
                        <Home />
                    </PrivateRoute>
                    <PrivateRoute path="/orgs/:id">
                        <Home />
                    </PrivateRoute>
                    <PrivateRoute path="/applications/:id">
                        <Application />
                    </PrivateRoute>
                    <PrivateRoute path="/auth" unauthenticated>
                        <Auth />
                    </PrivateRoute>
                    <PrivateRoute path="/account">
                        <Account />
                    </PrivateRoute>
                </Switch>
            </Router>
        </Layout>
    );
}
