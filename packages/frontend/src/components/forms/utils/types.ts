import { ValidationOptions } from 'react-hook-form';

export type FormProps<T> = Omit<T, 'ref' | 'errors' | 'error'> & {
    register?: ValidationOptions;
};
