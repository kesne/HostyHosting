import React, { useEffect } from 'react';
import useBoolean from '../../../utils/useBoolean';
import { useUpdateContainerGroupMutation } from '../../../queries';
import { useApplicationID } from '../ApplicationContext';
import Button, { ButtonGroup } from '../../ui/Button';
import Input from '../../ui/Input';
import Modal, { ModalFooter, ModalContent } from '../../ui/Modal';
import { useForm } from 'react-hook-form';

type Props = {
    id: number;
    currentNumber: number;
};

export default function ScaleContainer({ id, currentNumber }: Props) {
    const applicationID = useApplicationID();
    const [visible, { on, off }] = useBoolean(false);
    const [updateContainerGroup, { loading }] = useUpdateContainerGroupMutation();
    const { reset, errors, handleSubmit, register } = useForm();

    useEffect(() => {
        if (visible) {
            reset();
        }
    }, [visible]);

    async function handleOk(values: Record<string, string>) {
        const nextNumber = Number(values.number);
        if (nextNumber !== currentNumber) {
            await updateContainerGroup({
                variables: {
                    applicationID,
                    id,
                    number: nextNumber
                }
            });
        }

        off();
    }

    return (
        <>
            <Button onClick={on}>Scale</Button>
            <Modal open={visible} onClose={off}>
                <form onSubmit={handleSubmit(handleOk)}>
                    <ModalContent title="Scale Container">
                        <Input
                            name="number"
                            label="Number of Containers"
                            defaultValue={currentNumber}
                            errors={errors}
                            ref={register({
                                required: {
                                    value: true,
                                    message: 'You must deploy at least one container.'
                                }
                            })}
                        />
                    </ModalContent>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button type="submit" variant="primary">
                                Deploy Scale
                            </Button>
                            <Button onClick={off}>Cancel</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
}
