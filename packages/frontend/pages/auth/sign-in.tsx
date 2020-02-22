import { useState, useCallback } from 'react';
import Router from 'next/router';
import { withNoAuth } from '../../components/utils/auth';
import Container from '../../components/Auth/Container';
import VerifyTOTP from '../../components/Auth/VerifyTOTP';
import EmailPassword from '../../components/Auth/EmailPassword';

function SignIn() {
    const [requiresTOTP, setRequiresTOTP] = useState(false);

    const onSignIn = useCallback(() => {
        Router.push('/account');
    }, []);

    const handleRequiresTOTP = useCallback(() => {
        setRequiresTOTP(true);
    }, [setRequiresTOTP]);

    return (
        <Container title="Sign in">
            {requiresTOTP ? (
                <VerifyTOTP onSignIn={onSignIn} />
            ) : (
                <EmailPassword onSignIn={onSignIn} onRequiresTOTP={handleRequiresTOTP} />
            )}
        </Container>
    );
}

export default withNoAuth(SignIn);
