import React, { Suspense } from 'react';
import Modal, { ModalFooter, ModalContent } from '../ui/Modal';
import OnboardTOTPContent from './OnboardTOTPContent';
import Button from '../ui/Button';
import BasePlaceholder from '../ui/placeholder/Base';
import Text from '../ui/placeholder/Text';

type Props = {
    visible: boolean;
    onClose(): void;
};

function LoadingModal({ onClose }: any) {
    return (
        <>
            <ModalContent title="Enable Two-Factor Authentication">
                <BasePlaceholder className="h-36 w-36 mx-auto" />
                <Text className="w-1/2 mt-6 mx-auto" />
            </ModalContent>
            <ModalFooter>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </>
    );
}

export default function OnboardTOTP({ visible, onClose }: Props) {
    return (
        <Modal open={visible} onClose={onClose}>
            <Suspense fallback={<LoadingModal onClose={onClose} />}>
                <OnboardTOTPContent onClose={onClose} />
            </Suspense>
        </Modal>
    );
}
