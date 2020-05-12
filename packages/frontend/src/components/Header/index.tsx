import React from 'react';
import { useHasUser } from '../../utils/user';
import SignedInHeader from './SignedInHeader';
import SignedOutHeader from './SignedOutHeader';

export default function Header() {
    const hasUser = useHasUser();

    if (hasUser) {
        return <SignedInHeader />;
    }

    return <SignedOutHeader />;
}
