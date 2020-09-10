import React, { Suspense } from 'react';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import Container from '../ui/Container';
import VerticalNav, { VerticalNavItem } from '../ui/VerticalNav';
import Applications from './Applications';
import Members from './Members';
import Environments from './Environments';
import SelectOrganization from './SelectOrganization';
import PageLoading from './PageLoading';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { HomeQuery } from './__generated__/HomeQuery.graphql';

export default function Home() {
    const { pathname } = useLocation();
    const params = useParams();

    const data = useLazyLoadQuery<HomeQuery>(
        graphql`
            query HomeQuery($organization: String!) {
                organization(username: $organization) {
                    id
                    isPersonal
                }
            }
        `,
        {
            organization: params.organization,
        },
    );

    return (
        <Container className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col sm:flex-row">
                <div className="flex flex-shrink-0">
                    <div className="flex flex-col py-4 px-4 sm:px-0 w-full sm:w-64 sm:pr-4">
                        <SelectOrganization />
                        <div className="mt-6">
                            <VerticalNav value={pathname}>
                                <VerticalNavItem to="." label="Applications" />
                                <VerticalNavItem to="environments" label="Environments" />
                                {!data.organization.isPersonal && (
                                    <>
                                        <div className="border-t border-gray-200 my-2" />
                                        <h4 className="uppercase text-xs font-semibold text-gray-500 pt-2">
                                            Organization Management
                                        </h4>
                                        <VerticalNavItem to="members" label="Members" />
                                        <VerticalNavItem to="billing" label="Billing" />
                                        <VerticalNavItem to="settings" label="Settings" />
                                    </>
                                )}
                            </VerticalNav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 overflow-hidden bg-white border border-gray-200 border-t-0 border-b-0">
                    {/* <PageLoading /> */}
                    <Suspense fallback={<PageLoading />}>
                        <Routes>
                            <Route path="/" element={<Applications />} />
                            <Route path="environments" element={<Environments />} />
                            <Route path="members" element={<Members />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </Container>
    );
}
