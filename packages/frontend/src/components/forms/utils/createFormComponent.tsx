import React, { useContext } from 'react';
import { useFormContext, ValidationOptions } from 'react-hook-form';
import DisabledContext from './DisabledContext';

type FormProps<T> = Omit<T, 'ref' | 'errors' | 'error'> & {
    register?: ValidationOptions;
    assignOnChange?: (something: Record<string, string>) => Record<string, string>;
};

type BaseComponentProps = {
    onBlur?: (event: any) => void;
};

export default function createFormComponent<Props extends BaseComponentProps>(
    Component: React.ComponentType<Props>,
): React.ComponentType<FormProps<Props>> {
    function FormComponent({ assignOnChange, register, ...props }: FormProps<Props>) {
        const form = useFormContext();
        const disabled = useContext(DisabledContext);

        if (assignOnChange) {
            props.onBlur = () => {
                const values = assignOnChange(form.getValues());
                if (values) {
                    Object.entries(values).forEach(([key, value]) => {
                        form.setValue(key, value);
                    });
                }
            };
        }

        return (
            // @ts-ignore: TODO: Figure out this type error:
            <Component
                ref={register ? form.register(register) : form.register}
                errors={form.errors}
                disabled={disabled}
                {...props}
            />
        );
    }

    FormComponent.displayName = `Form${Component.displayName || Component.name}`;

    return FormComponent;
}
