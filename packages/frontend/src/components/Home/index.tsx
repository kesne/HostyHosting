import React from 'react';
import Container from '../ui/Container';
import VerticalNav, { VerticalNavItem } from '../ui/VerticalNav';
import { Routes, Route, useLocation } from 'react-router-dom';
import Applications from './Applications';
import Environments from './Environments';
import SelectOrganization from './SelectOrganization';

export default function Home() {
    const { pathname } = useLocation();

    return (
        <Container>
            <div className="flex">
                <div className="flex flex-shrink-0">
                    <div className="flex flex-col w-64 py-2 pr-4">
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
                <div className="flex flex-col w-0 flex-1 overflow-hidden bg-white border border-gray-200 border-t-0">
                    <Routes>
                        <Route
                            path="/"
                            element={<Applications />}
                        />
                        <Route path="routers" element={<div>TODO: add routers</div>} />
                        <Route
                            path="environments"
                            element={<Environments />}
                        />
                    </Routes>
                </div>
            </div>
        </Container>
    );
}
