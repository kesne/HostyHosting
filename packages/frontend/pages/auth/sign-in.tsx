import { useCallback } from 'react';
import Router from 'next/router';
import { withNoAuth } from '../../components/utils/auth';
import Container from '../../components/Auth/Container';
import VerifyTOTP from '../../components/Auth/VerifyTOTP';
import EmailPassword from '../../components/Auth/EmailPassword';
import useBoolean from '../../components/utils/useBoolean';

function SignIn() {
    const [requiresTOTP, { on }] = useBoolean(false);

    const onSignIn = useCallback(() => {
        Router.push('/account');
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
