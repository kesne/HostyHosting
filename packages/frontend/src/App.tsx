import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
                <Routes>
                    <PrivateRoute path="/" element={<Home />} />
                    <PrivateRoute path="/orgs/:organization" element={<Home />} />
                    <PrivateRoute path="/applications/:application/*" element={<Application />} />
                    <PrivateRoute path="/grant/:uuid" element={<GrantAPIKey />} />
                    <PrivateRoute path="/auth/*" unauthenticated element={<Auth />} />
                    <PrivateRoute path="/account/*" element={<Account />} />
                    <Route path="*">
                        <FourOhFour />
                    </Route>
                </Routes>
            </Layout>
        </Router>
    );
}
