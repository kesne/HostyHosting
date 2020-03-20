import React from 'react';
import clsx from 'clsx';
import ButtonOrLink from './util/ButtonOrLink';

type Tab = {
    label: string;
    value: string;
    to?: string;
};

function TabItem({ tab, selected, last }: { tab: Tab; selected: boolean; last?: boolean }) {
    return (
        <button
            className={clsx(
                'whitespace-no-wrap py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 focus:outline-none',
                selected
                    ? 'border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700'
                    : 'text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:border-gray-300 hover:border-gray-300',
                !last && 'mr-8'
            )}
        >
            {tab.label}
        </button>
    );
}
function PillsTabItem({
    tab,
    secondary,
    selected,
    last
}: {
    tab: Tab;
    selected: boolean;
    secondary?: boolean;
    last?: boolean;
}) {
    return (
        <ButtonOrLink
            to={tab.to}
            className={clsx(
                'py-2 px-3 font-medium text-sm leading-5 rounded-md focus:outline-none',
                !secondary && {
                    'text-indigo-700 bg-indigo-100 focus:text-indigo-800 focus:bg-indigo-200': selected,
                    'text-gray-500 hover:text-gray-700 focus:text-indigo-600 focus:bg-indigo-50': !selected
                },
                secondary && {
                    'text-gray-800 bg-gray-200 focus:bg-gray-300': selected,
                    'text-gray-600 hover:text-gray-800 focus:text-gray-800 focus:bg-gray-200': !selected
                },
                !last && 'mr-4'
            )}
        >
            {tab.label}
        </ButtonOrLink>
    );
}

export default function Tabs({
    secondary,
    pills,
    tabs,
    value,
    onChange
}: {
    secondary?: boolean;
    pills?: boolean;
    tabs: Tab[];
    value: string;
    onChange?: () => void;
}) {
    return (
        <>
            <div className="sm:hidden">
                <select
                    aria-label="Selected tab"
                    className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
                    onChange={onChange}
                    value={value}
                >
                    {tabs.map(tab => (
                        <option key={tab.value} value={tab.value}>{tab.label}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className={clsx(!pills && 'border-b border-gray-200')}>
                    <nav className={clsx('flex', !pills && '-mb-px')}>
                        {tabs.map((tab, i) =>
                            pills ? (
                                <PillsTabItem
                                    key={i}
                                    secondary={secondary}
                                    tab={tab}
                                    selected={value === tab.value}
                                    last={i === tabs.length - 1}
                                />
                            ) : (
                                <TabItem
                                    key={i}
                                    tab={tab}
                                    selected={value === tab.value}
                                    last={i === tabs.length - 1}
                                />
                            )
                        )}
                    </nav>
                </div>
            </div>
        </>
    );
}
