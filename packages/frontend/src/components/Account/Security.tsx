import React from 'react';
import OnboardTOTP from './OnboardTOTP';
import DisableTOTP from './DisableTOTP';
import useBoolean from '../../utils/useBoolean';
import Button from '../ui/Button';
import Card, { CardContent } from '../ui/Card';
import { useLazyLoadQuery, graphql } from 'react-relay/hooks';
import { SecurityQuery } from './__generated__/SecurityQuery.graphql';

function TOTPModal({
    visible,
    hasTOTP,
    onClose,
}: {
    visible: boolean;
    hasTOTP: boolean;
    onClose(): void;
}) {
    if (hasTOTP) {
        return <DisableTOTP visible={visible} onClose={onClose} />;
    }
    return <OnboardTOTP visible={visible} onClose={onClose} />;
}

export default function Security() {
    const [totpModalVisible, { off, on }] = useBoolean(false);
    const data = useLazyLoadQuery<SecurityQuery>(
        graphql`
            query SecurityQuery {
                viewer {
                    id
                    hasTOTP
                }
            }
        `,
        {},
    );

    function onClose() {
        off();
    }

    return (
        <Card>
            <CardContent>
                <Button>Change Password</Button>
                <hr className="my-6" />
                <p className="text-gray-700 leading-normal mb-2">
                    Two factor auth <strong>{data.viewer.hasTOTP ? 'is' : 'is not'}</strong> enabled.
                </p>
                <Button variant={data.viewer.hasTOTP ? 'danger' : 'default'} onClick={on}>
                    {data.viewer.hasTOTP ? 'Disable' : 'Enable'} Two-Factor Authentication
                </Button>
                <TOTPModal visible={totpModalVisible} hasTOTP={data.viewer.hasTOTP} onClose={onClose} />
            </CardContent>
        </Card>
    );
}
