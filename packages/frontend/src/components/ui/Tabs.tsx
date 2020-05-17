import React from 'react';
import clsx from 'clsx';
import ButtonOrLink from './util/ButtonOrLink';
import { useNavigate } from 'react-router-dom';

type OnChange = (value: string) => void;

type Tab = {
    label: string;
    value: string;
    to?: string;
};

function TabItem({
    tab,
    selected,
    flex,
    onChange,
}: {
    tab: Tab;
    selected: boolean;
    flex?: boolean;
    onChange?: OnChange;
}) {
    return (
        <ButtonOrLink
            to={tab.to}
            className={clsx(
                'whitespace-no-wrap py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 focus:outline-none mr-8 last:mr-0',
                selected
                    ? 'border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700'
                    : 'text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:border-gray-300 hover:border-gray-300',
                flex && 'flex-1',
            )}
            onClick={() => onChange?.(tab.value)}
        >
            {tab.label}
        </ButtonOrLink>
    );
}
function PillsTabItem({
    tab,
    secondary,
    selected,
}: {
    tab: Tab;
    selected: boolean;
    secondary?: boolean;
}) {
    return (
        <ButtonOrLink
            to={tab.to}
            className={clsx(
                'py-2 px-3 font-medium text-sm leading-5 rounded-md focus:outline-none mr-4 last:mr-0',
                !secondary && {
                    'text-indigo-700 bg-indigo-100 focus:text-indigo-800 focus:bg-indigo-200': selected,
                    'text-gray-500 hover:text-gray-700 focus:text-indigo-600 focus:bg-indigo-50': !selected,
                },
                secondary && {
                    'text-gray-800 bg-gray-200 focus:bg-gray-300': selected,
                    'text-gray-600 hover:text-gray-800 focus:text-gray-800 focus:bg-gray-200': !selected,
                },
            )}
        >
            {tab.label}
        </ButtonOrLink>
    );
}

// TODO: The responsive variant here doesn't actually work.
export default function Tabs({
    secondary,
    flex,
    pills,
    tabs,
    value,
    onChange,
}: {
    secondary?: boolean;
    flex?: boolean;
    pills?: boolean;
    tabs: Tab[];
    value: string;
    onChange?: OnChange;
}) {
    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (onChange) {
            onChange(e.target.value);
        } else {
            const tab = tabs.find(({ value }) => value === e.target.value);
            if (tab && tab.to) {
                navigate(tab.to);
            } else {
                console.warn('Tabs had no clear action to takeUnknown action to take.', tab);
            }
        }
    }

    return (
        <>
            <div className="sm:hidden">
                <select
                    aria-label="Selected tab"
                    className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
                    onChange={handleChange}
                    value={value}
                >
                    {tabs.map(tab => (
                        <option key={tab.value} value={tab.value}>
                            {tab.label}
                        </option>
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
                                />
                            ) : (
                                <TabItem
                                    key={i}
                                    tab={tab}
                                    selected={value === tab.value}
                                    flex={flex}
                                    onChange={onChange}
                                />
                            ),
                        )}
                    </nav>
                </div>
            </div>
        </>
    );
}
