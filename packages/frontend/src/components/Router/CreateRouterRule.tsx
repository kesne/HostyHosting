import React from 'react';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button, { ButtonGroup } from '../ui/Button';
import SubmitButton from '../forms/SubmitButton';
import Form from '../forms/Form';
import Input from '../forms/Input';
import Computed from '../forms/Computed';
import Checkbox from '../forms/Checkbox';

export default function CreateRouterRule() {
    return (
        <Modal open onClose={() => {}}>
            <Form onSubmit={() => {}}>
                <ModalContent title="Create Rule">
                    <div className="space-y-6">
                        <Input label="Domain" name="domain" register={{ required: true }} />
                        <Input
                            label="Path Prefix"
                            name="pathPrefix"
                            register={{ required: true }}
                        />
                        <Checkbox
                            label="Forward Path Prefix"
                            name="forwardPathPrefix"
                            defaultChecked={true}
                        />
                        <Computed>
                            {({ domain, pathPrefix, forwardPathPrefix }) => (
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <div>FROM: {`https://${domain}/${pathPrefix}`}</div>
                                    <div>
                                        TO: component-something/
                                        {forwardPathPrefix ? pathPrefix : ''}/
                                    </div>
                                </div>
                            )}
                        </Computed>
                    </div>
                </ModalContent>
                <ModalFooter>
                    <ButtonGroup>
                        <Button>Cancel</Button>
                        <SubmitButton>Create</SubmitButton>
                    </ButtonGroup>
                </ModalFooter>
            </Form>
        </Modal>
    );
}
