import { useState, useMemo } from 'react';

export default function useBoolean(defaultValue: boolean) {
    const [value, setValue] = useState(defaultValue);

    const setters = useMemo(
        () => ({
            on() {
                setValue(true);
            },
            off() {
                setValue(false);
            },
            toggle() {
                setValue(value => !value);
            }
        }),
        [setValue]
    );

    return [value, setters] as const;
}
