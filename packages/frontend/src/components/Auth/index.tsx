import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Forgot from './Forgot';
import Reset from './Reset';
import GitHubCallback from './GitHubCallback';

export default function Auth() {
    return (
        <Routes>
            <Route path="sign-in">
                <SignIn />
            </Route>
            <Route path="sign-up">
                <SignUp />
            </Route>
            <Route path="forgot">
                <Forgot />
            </Route>
            <Route path="reset/:uuid">
                <Reset />
            </Route>
            <Route path="github/callback">
                <GitHubCallback />
            </Route>
            <Navigate to="sign-in" />
        </Routes>
    );
}
