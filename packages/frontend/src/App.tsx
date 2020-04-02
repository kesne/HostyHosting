import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Auth from './components/Auth';
import Application from './components/Application';
import PrivateRoute from './components/PrivateRoute';
import Account from './components/Account';
import GrantAPIKey from './components/Auth/GrantAPIKey';
import FourOhFour from './components/404';

export default function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <PrivateRoute path="/" exact>
                        <Home />
                    </PrivateRoute>
                    <PrivateRoute path="/orgs/:organization">
                        <Home />
                    </PrivateRoute>
                    <PrivateRoute path="/applications/:application">
                        <Application />
                    </PrivateRoute>
                    <PrivateRoute path="/grant/:uuid">
                        <GrantAPIKey />
                    </PrivateRoute>
                    <PrivateRoute path="/auth" unauthenticated>
                        <Auth />
                    </PrivateRoute>
                    <PrivateRoute path="/account">
                        <Account />
                    </PrivateRoute>
                    <Route>
                        <FourOhFour />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}
