import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Container from '../ui/Container';
import VerticalNav, { VerticalNavItem } from '../ui/VerticalNav';
import Applications from './Applications';
import Environments from './Environments';
import SelectOrganization from './SelectOrganization';
import PageLoading from './PageLoading';
import Routers from './Routers';

export default function Home() {
    const { pathname } = useLocation();

    return (
        <Container className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col sm:flex-row">
                <div className="flex flex-shrink-0">
                    <div className="flex flex-col py-4 px-4 sm:px-0 w-full sm:w-64 sm:pr-4">
                        <SelectOrganization />
                        <div className="mt-6">
                            <VerticalNav value={pathname}>
                                <VerticalNavItem to="." label="Applications" />
                                <VerticalNavItem to="routers" label="Routers" />
                                <VerticalNavItem to="environments" label="Environments" />
                            </VerticalNav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 overflow-hidden bg-white border border-gray-200 border-t-0 border-b-0">
                    <Suspense fallback={<PageLoading />}>
                        <Routes>
                            <Route path="/" element={<Applications />} />
                            <Route path="routers" element={<Routers />} />
                            <Route path="environments" element={<Environments />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </Container>
    );
}
