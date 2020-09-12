import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Security from './Security';
import EditAccount from './EditAccount';
import VerticalNav, { VerticalNavItem } from '../ui/VerticalNav';
import Container from '../ui/Container';
import APIKeys from './APIKeys';
import Organizations from './Organizations';
import Card from '../ui/placeholder/Card';

function AccountLayout() {
    const { pathname } = useLocation();

    return (
        <div className="flex flex-col sm:flex-row mt-6">
            <div className="sm:w-64">
                <VerticalNav value={pathname}>
                    <VerticalNavItem to="." label="Account" />
                    <VerticalNavItem to="security" label="Security" />
                    <VerticalNavItem to="organizations" label="Organizations" />
                    <VerticalNavItem to="billing" label="Billing" />
                    <VerticalNavItem to="apikeys" label="API Keys" />
                </VerticalNav>
            </div>
            <div className="flex-1 mt-4 sm:ml-6 sm:mt-0">
                <Suspense fallback={<Card />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
}

function Todo() {
    return <div>NOT YET IMPLEMENTED</div>;
}

export default function Account() {
    return (
        <Container>
            <Routes>
                <Route path="/" element={<AccountLayout />}>
                    <Route path="billing" element={<Todo />} />
                    <Route path="organizations" element={<Organizations />} />
                    <Route path="apikeys" element={<APIKeys />} />
                    <Route path="security" element={<Security />} />
                    <Route path="/" element={<EditAccount />} />
                    <Route path="*" element={<Navigate to="." replace />} />
                </Route>
            </Routes>
        </Container>
    );
}
