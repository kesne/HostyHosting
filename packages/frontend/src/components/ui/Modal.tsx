import React, { useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import noScroll from 'no-scroll';
import useKeyboardEvent from './util/useKeyboardEvent';
import Portal from './util/Portal';
import { AnimatePresence, motion } from 'framer-motion';
import useMediaQuery from '../../utils/useMediaQuery';
import { MEDIA_QUERIES } from './constants';

type Props = {
    open: boolean;
    onClose(): void;
    children: React.ReactNode;
};

export function ModalContent({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="">
                <div className="mt-3 sm:mt-0">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                    <div className="mt-2">{children}</div>
                </div>
            </div>
        </div>
    );
}

export const ModalFooterContext = React.createContext(false);

export function ModalFooter({ children }: { children: React.ReactNode }) {
    return (
        <ModalFooterContext.Provider value={true}>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {children}
            </div>
        </ModalFooterContext.Provider>
    );
}

export default function Modal({ open, onClose, children }: Props) {
    const atLeastSmall = useMediaQuery(MEDIA_QUERIES.SMALL);

    const modalInitial = atLeastSmall
        ? {
              opacity: 0,
              scale: 0.95
          }
        : {
              opacity: 0,
              y: 25
          };

    const modalIn = atLeastSmall
        ? {
              opacity: 1,
              scale: 1
          }
        : {
              opacity: 1,
              y: 0
          };

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

    return (
        <AnimatePresence>
            {open && (
                <Portal>
                    <FocusTrap>
                        <div className="z-10 fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="fixed inset-0 transition-opacity"
                                onClick={onClose}
                            >
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </motion.div>

                            <motion.div
                                initial={modalInitial}
                                animate={modalIn}
                                exit={modalInitial}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                role="dialog"
                                className="relative bg-white rounded-lg overflow-hidden shadow-xl sm:max-w-lg sm:w-full z-10"
                            >
                                {children}
                            </motion.div>
                        </div>
                    </FocusTrap>
                </Portal>
            )}
        </AnimatePresence>
    );
}
