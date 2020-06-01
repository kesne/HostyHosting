import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function Text({ className }: { className: string }) {
    return (
        <motion.div
            className={clsx(className, 'py-1')}
            animate={{ opacity: 0.5 }}
            transition={{
                flip: Infinity,
                duration: 0.8,
            }}
        >
            <div className="h-4 w-full bg-gray-300"></div>
        </motion.div>
    );
}
