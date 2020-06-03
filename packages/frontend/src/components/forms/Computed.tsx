import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
    children(values: Record<string, any>): React.ReactNode;
};

export default function Computed({ children }: Props) {
    const proxyRef = useRef<any>();
    const form = useFormContext();

    if (!proxyRef.current) {
        const fields = new Set();
        const currentValues = form.getValues();
        const proxy = new Proxy(
            {},
            {
                get(_target, property: string) {
                    fields.add(property);
                    return proxyRef.current.currentValues[property];
                },
            },
        );

        proxyRef.current = { fields, currentValues, proxy };
    } else {
        proxyRef.current = { ...proxyRef.current, currentValues: form.getValues() };
    }

    const result = children(proxyRef.current.proxy);

    form.watch([...proxyRef.current.fields]);

    return <>{result}</>;
}
