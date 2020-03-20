import React from 'react';
import Container from '../../components/Account/Container';
import EditAccount from '../../components/Account/EditAccount';

export default function AccountRoute() {
    return (
        <Container selected="account">
            <EditAccount />
        </Container>
    );
}
