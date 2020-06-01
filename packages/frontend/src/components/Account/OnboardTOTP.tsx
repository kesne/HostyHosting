import React, { Suspense } from 'react';
import Modal, { ModalFooter, ModalContent } from '../ui/Modal';
import OnboardTOTPContent from './OnboardTOTPContent';
import Button from '../ui/Button';

type Props = {
    visible: boolean;
    onClose(): void;
};

function LoadingModal({ onClose }: any) {
    return (
        <>
            <ModalContent title="Enable Two-Factor Authentication">
                TODO: LOADING STUFF
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
