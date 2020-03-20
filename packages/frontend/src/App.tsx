import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Auth from './components/Auth';
import Application from './components/Application';

export default function App() {
    return (
        <Layout>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/orgs/:id">
                        <Home />
                    </Route>
                    <Route path="/applications/:id">
                        <Application />
                    </Route>
                    <Route path="/auth">
                        <Auth />
                    </Route>
                    <Route path="/account">
                        <div>account</div>
                    </Route>
                </Switch>
            </Router>
        </Layout>
    );
}
