import React from 'react';
import Text from './Text';
import { motion } from 'framer-motion';

export default function Card({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            className="rounded bg-gray-50 shadow-sm"
            animate={{ backgroundColor: '#fff' }}
            transition={{
                flip: Infinity,
                duration: 3,
            }}
        >
            <div className="p-6 border-b border-gray-100">
                <Text className="w-1/5" />
            </div>
            <div className="p-6 space-y-6">{children}</div>
        </motion.div>
    );
}
