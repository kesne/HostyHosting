import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from './Container';
import Button from '@daas/ui/Button';
import { useGrantApiKeyMutation } from '../../queries';

// jHiYNCYFE2esw99NodZBK6we4aeNU+4rjex6479QmpJkIj9n4Sp1nKJ9RiHS+SgejJf6OumzIlUCQZWK9MkeRA==

// TODO: If the user had TOTP enabled, we should force another two-factor-auth check here.
export default function GrantAPIKey() {
    const { uuid } = useParams<{ uuid: string }>();
    const [grantAPIKey, { data, loading }] = useGrantApiKeyMutation({ variables: { uuid } });\

    function handleGrant() {
        grantAPIKey();
    }

    return (
        <Container title="Grant CLI Access">
            {data ? (
                <p>
                    The API key has been granted. You may now close this window.
                </p>
            ) : (
                <>
                    <p className="mb-6">Please grant the CLI permission to use your account.</p>
                    <Button variant="primary" disabled={loading} onClick={handleGrant} fullWidth>
                        Grant
                    </Button>
                </>
            )}
        </Container>
    );
}
