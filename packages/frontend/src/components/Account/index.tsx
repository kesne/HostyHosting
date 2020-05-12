import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Security from './Security';
import EditAccount from './EditAccount';
import VerticalNav, { VerticalNavItem } from '../ui/VerticalNav';
import Container from '../ui/Container';
import APIKeys from './APIKeys';
import Spinner from '../Spinner';

export default function Account() {
    const { pathname } = useLocation();

    return (
        <Container>
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
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="billing">billing</Route>
                            <Route path="organizations">orgs</Route>
                            <Route path="apikeys" element={<APIKeys />} />
                            <Route path="security" element={<Security />} />
                            <Route path="/" element={<EditAccount />} />
                            <Route path="*" element={<Navigate to="." replace />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </Container>
    );
}
