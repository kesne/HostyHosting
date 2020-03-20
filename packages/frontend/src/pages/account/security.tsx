import React from 'react';
import Security from '../../components/Account/Security';
import Container from '../../components/Account/Container';

export default function SecurityRoute() {
    return (
        <Container selected="security">
            <Security />
        </Container>
    );
}
