import React from 'react';

export default function Checkbox({}) {
    return (
        <label className="flex items-center">
            <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm leading-5 text-gray-900">Remember me</span>
        </label>
    );
}
