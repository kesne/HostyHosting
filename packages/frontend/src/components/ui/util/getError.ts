import { FieldError } from 'react-hook-form';

function getErrorMessage(error?: FieldError) {
    if (!error) {
        return undefined;
    }

    if (error.message) {
        return error.message;
    }

    if (error.type === 'required') {
        return 'Field is required.';
    }

    return 'Field contains an error';
}

export default function getError({
    name,
    errors,
    error
}: {
    name?: string;
    errors?: Record<string, FieldError>;
    error?: string;
}) {
    return error ?? getErrorMessage(errors?.[name ?? '']);
}
