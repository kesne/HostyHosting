import React, { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormProps } from './types';
import DisabledContext from './DisabledContext';

export default function createFormComponent<Props>(
    Component: React.ComponentType<Props>,
): React.ComponentType<FormProps<Props>> {
    function FormComponent(props: FormProps<Props>) {
        const form = useFormContext();
        const disabled = useContext(DisabledContext);
        return (
            // @ts-ignore: TODO: Figure out this type error:
            <Component
                ref={props.register ? form.register(props.register) : form.register}
                errors={form.errors}
                disabled={disabled}
                {...props}
            />
        );
    }

    FormComponent.displayName = `Form${Component.displayName || Component.name}`;

    return FormComponent;
}
