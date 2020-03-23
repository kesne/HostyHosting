import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

const list = {
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    },
    hidden: { opacity: 0 }
};

const item = {
    visible: { opacity: 1, y: 0, transition: { ease: 'circOut', duration: 0.5 } },
    hidden: { opacity: 0, y: 50 }
};

export function EnterContainer(props: HTMLMotionProps<'div'>) {
    return <motion.div initial="hidden" animate="visible" variants={list} {...props} />;
}

export function EnterItem(props: HTMLMotionProps<'div'>) {
    return <motion.div variants={item} {...props} />;
}
