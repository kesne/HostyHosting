import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Container from './Container';
import VerifyTOTP from './VerifyTOTP';
import EmailPassword from './EmailPassword';
import useBoolean from '../../utils/useBoolean';

export default
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
