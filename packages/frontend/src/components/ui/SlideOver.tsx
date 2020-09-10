import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from './util/Portal';
import useKeyboardEvent from './util/useKeyboardEvent';
import FocusTrap from './util/FocusTrap';

type Props = {
    title: string;
    children: React.ReactNode;
    visible: boolean;
    onClose(): void;
};

export default function SlideOver({ visible, onClose, children, title }: Props) {
    useKeyboardEvent('Escape', () => {
        onClose();
    });

    return (
        <AnimatePresence>
            {visible && (
                <Portal>
                    <FocusTrap>
                        <div className="fixed inset-0 overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-gray-500 bg-opacity-75"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    onClick={onClose}
                                />
                                <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
                                    <motion.div
                                        className="w-screen max-w-md"
                                        initial={{ translateX: '100%' }}
                                        animate={{ translateX: 0 }}
                                        exit={{ translateX: '100%' }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                        <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                                            <header className="px-4 sm:px-6 border-b pb-6 border-gray-200">
                                                <div className="flex items-start justify-between space-x-3">
                                                    <h2 className="text-lg leading-7 font-medium text-gray-900">
                                                        {title}
                                                    </h2>
                                                    <div className="h-7 flex items-center">
                                                        <button
                                                            aria-label="Close panel"
                                                            className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                                                            onClick={onClose}
                                                        >
                                                            <svg
                                                                className="h-6 w-6"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </header>
                                            <div className="relative flex-1">{children}</div>
                                        </div>
                                    </motion.div>
                                </section>
                            </div>
                        </div>
                    </FocusTrap>
                </Portal>
            )}
        </AnimatePresence>
    );
}
