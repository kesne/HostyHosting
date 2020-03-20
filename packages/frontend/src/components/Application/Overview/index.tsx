import React from 'react';
import { motion } from 'framer-motion';
import Card from '../../ui/Card';
import { useApplicationID } from '../ApplicationContext';
import { useApplicationQuery } from '../../../queries';
import Spinner from '../../Spinner';

function formatDate(timestamp: string) {
    return new Date(timestamp).toDateString();
}

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

export default function Overview() {
    const id = useApplicationID();
    const { data } = useApplicationQuery({
        variables: {
            id
        }
    });

    if (!data) {
        return <Spinner />;
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={list}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
            <motion.div variants={item}>
                <Card
                    header={
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Details</h3>
                    }
                >
                    <div className="px-4 py-5 sm:p-0">
                        <dl>
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Created By
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    <a>{data.application.createdBy?.name}</a>
                                </dd>
                            </div>
                            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Created At
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {formatDate(data.application.createdAt)}
                                </dd>
                            </div>
                            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Last Updated
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {formatDate(data.application.updatedAt)}
                                </dd>
                            </div>
                            <div className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                                <dt className="text-sm leading-5 font-medium text-gray-500">
                                    Description
                                </dt>
                                <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data.application.description}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </Card>
            </motion.div>
            <motion.div variants={item}>
                <Card
                    header={
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Deployment History
                        </h3>
                    }
                >
                    TODO
                </Card>
            </motion.div>
            <motion.div variants={item}>
                <Card
                    header={
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Containers</h3>
                    }
                >
                    TODO
                </Card>
            </motion.div>
        </motion.div>
    );
}
