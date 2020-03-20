import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { withNoAuth } from '../../components/utils/auth';
import Container from '../../components/Auth/Container';
import VerifyTOTP from '../../components/Auth/VerifyTOTP';
import EmailPassword from '../../components/Auth/EmailPassword';
import useBoolean from '../../components/utils/useBoolean';

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
