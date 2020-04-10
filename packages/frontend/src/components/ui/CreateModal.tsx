import React, { useEffect } from 'react';
import Modal, { ModalContent, ModalFooter } from './Modal';
import Button, { ButtonGroup } from './Button';
import { useForm, FormContextValues } from 'react-hook-form';

type Props = {
    title: string;
    open: boolean;
    onClose(): void;
    onSubmit(values: Record<string, string>): void;
    children: (props: FormContextValues) => React.ReactNode;
};

export default function CreateModal({ title, open, onClose, onSubmit, children }: Props) {
    const form = useForm();

    useEffect(() => {
        if (open) {
            form.reset();
        }
    }, [open]);

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <ModalContent title={title}>{children(form)}</ModalContent>
                <ModalFooter>
                    <ButtonGroup>
                        <Button type="submit" variant="primary">
                            Create
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ButtonGroup>
                </ModalFooter>
            </form>
        </Modal>
    );
}
