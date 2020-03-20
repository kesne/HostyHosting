import React, { useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import noScroll from 'no-scroll';
import useKeyboardEvent from './util/useKeyboardEvent';
import Portal from './util/Portal';

type Props = {
    open: boolean;
    onClose(): void;
    children: React.ReactNode;
};

export function ModalContent({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                    <div className="mt-2">{children}</div>
                </div>
            </div>
        </div>
    );
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">{children}</div>
    );
}

export default function Modal({ open, onClose, children }: Props) {
    useEffect(() => {
        if (open) {
            noScroll.on();
        }

        return () => {
            noScroll.off();
        };
    }, [open]);

    useKeyboardEvent('Escape', () => {
        onClose();
    });

    return open ? (
        <Portal>
            <FocusTrap>
                <div className="z-10 fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                    <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <div
                        role="dialog"
                        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
                    >
                        {children}
                    </div>
                </div>
            </FocusTrap>
        </Portal>
    ) : null;
}
