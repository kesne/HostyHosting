import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from './Container';
import VerifyTOTP from './VerifyTOTP';
import EmailPassword from './EmailPassword';
import useBoolean from '../../utils/useBoolean';
import Link from '../ui/Link';

export default function SignIn() {
    const [requiresTOTP, { on }] = useBoolean(false);
    const navigate = useNavigate();
    const location = useLocation<{ from?: string }>();

    const onSignIn = useCallback(() => {
        navigate(location.state?.from ?? '/');
    }, []);

    return (
        <Container
            title="Sign in to your account"
            subtitle={
                <span>
                    Or <Link to="/auth/sign-up">start your 14-day free trial</Link>
                </span>
            }
        >
            {requiresTOTP ? (
                <VerifyTOTP onSignIn={onSignIn} />
            ) : (
                <EmailPassword onSignIn={onSignIn} onRequiresTOTP={on} />
            )}
        </Container>
    );
}
