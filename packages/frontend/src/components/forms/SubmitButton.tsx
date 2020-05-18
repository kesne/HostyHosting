import React, { useContext } from 'react';
import Button, { Props } from '../ui/Button';
import DisabledContext from './utils/DisabledContext';

export default function SubmitButton(props: Props) {
    const disabled = useContext(DisabledContext);
    return <Button type="submit" variant="primary" disabled={disabled} {...props} />;
}
