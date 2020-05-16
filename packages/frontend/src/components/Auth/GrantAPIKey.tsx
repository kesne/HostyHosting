import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, graphql } from 'react-relay/hooks';
import Container from './Container';
import Button from '../ui/Button';
import { GrantAPIKeyMutation } from './__generated__/GrantAPIKeyMutation.graphql';

// TODO: If the user had TOTP enabled, we should force another two-factor-auth check here.
export default function GrantAPIKey() {
    const params = useParams();
    const [granted, setGranted] = useState(false);

    const [commit, isInFlight] = useMutation<GrantAPIKeyMutation>(graphql`
        mutation GrantAPIKeyMutation($uuid: String!) {
            grantAPIKey(uuid: $uuid) {
                ok
            }
        }
    `);

    function handleGrant() {
        commit({
            variables: { uuid: params.uuid },
            onCompleted() {
                setGranted(true);
            },
        });
    }

    return (
        <Container title="Grant CLI Access">
            {granted ? (
                <p>The API key has been granted. You may now close this window.</p>
            ) : (
                <>
                    <p className="mb-6">Please grant the CLI permission to use your account.</p>
                    <Button variant="primary" disabled={isInFlight} onClick={handleGrant} fullWidth>
                        Grant
                    </Button>
                </>
            )}
        </Container>
    );
}
