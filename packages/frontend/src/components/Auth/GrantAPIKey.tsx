import React from 'react';
import { useParams } from 'react-router-dom';
import Container from './Container';
import Button from '../ui/Button';
import { useGrantApiKeyMutation } from '../../queries';

// TODO: If the user had TOTP enabled, we should force another two-factor-auth check here.
export default function GrantAPIKey() {
    const { uuid } = useParams<{ uuid: string }>();
    const [grantAPIKey, { data, loading }] = useGrantApiKeyMutation({ variables: { uuid } });

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
