import React from 'react';
import VerticalNav, { VerticalNavItem } from '../ui/VerticalNav';
import { useRouteMatch } from 'react-router-dom';
import UIContainer from '../ui/Container';
import Card, { CardContent } from '../ui/Card';

type Props = {
    children: React.ReactNode;
};

export default function Container({ children }: Props) {
    const { url } = useRouteMatch('/account/:page?')!;

    return (
        <UIContainer>
            <div className="flex flex-col sm:flex-row mt-6">
                <div className="sm:w-64">
                    <VerticalNav value={url}>
                        <VerticalNavItem to="/account" label="Account" />
                        <VerticalNavItem to="/account/security" label="Security" />
                        <VerticalNavItem to="/account/organizations" label="Organizations" />
                        <VerticalNavItem to="/account/billing" label="Billing" />
                    </VerticalNav>
                </div>
                <div className="flex-1 mt-4 sm:ml-6 sm:mt-0">
                    <Card>
                        <CardContent>{children}</CardContent>
                    </Card>
                </div>
            </div>
        </UIContainer>
    );
}
