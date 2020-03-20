import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { withNoAuth } from '../utils/auth';
import Container from './Container';
import VerifyTOTP from './VerifyTOTP';
import EmailPassword from './EmailPassword';
import useBoolean from '../utils/useBoolean';

function SignIn() {
    const [requiresTOTP, { on }] = useBoolean(false);
    const history = useHistory();

    const onSignIn = useCallback(() => {
        history.push('/account');
    }, []);

    return (
        <Container title="Sign in">
            {requiresTOTP ? (
                <VerifyTOTP onSignIn={onSignIn} />
            ) : (
                <EmailPassword onSignIn={onSignIn} onRequiresTOTP={on} />
            )}
        </Container>
    );
}

export default withNoAuth(SignIn);
