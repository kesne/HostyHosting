import React from 'react';
import Modal, { ModalContent, ModalFooter } from '../../../ui/Modal';
import Button, { ButtonGroup } from '../../../ui/Button';
import SubmitButton from '../../../forms/SubmitButton';
import Form from '../../../forms/Form';
import Input from '../../../forms/Input';
import Computed from '../../../forms/Computed';
import Checkbox from '../../../forms/Checkbox';
import { useMutation, graphql } from 'react-relay/hooks';
import { CreateRouterRuleMutation } from './__generated__/CreateRouterRuleMutation.graphql';

type Props = {
    open: boolean;
    onClose(): void;
    containerGroup: string;
};

const DOMAIN_REGEX = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;

export default function CreateRouterRule({ open, containerGroup, onClose }: Props) {
    const [commit, isInFlight] = useMutation<CreateRouterRuleMutation>(graphql`
        mutation CreateRouterRuleMutation($input: CreateRouterRuleInput!) {
            createRouterRule(input: $input) {
                id
            }
        }
    `);

    function onSubmit(values: Record<string, any>) {
        commit({
            variables: {
                input: {
                    containerGroupID: containerGroup,
                    domain: values.domain,
                    pathPrefix: values.pathPrefix,
                    forwardPathPrefix: values.forwardPathPrefix,
                },
            },
        });
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Form disabled={isInFlight} onSubmit={onSubmit}>
                <ModalContent title="Create Rule">
                    <div className="space-y-6">
                        <Input
                            label="Domain"
                            name="domain"
                            register={{ required: true, pattern: DOMAIN_REGEX }}
                        />
                        <Checkbox label="Custom Path Prefix Match" name="customPathPrefix" />
                        <Computed>
                            {({ customPathPrefix }) =>
                                customPathPrefix && (
                                    <>
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
                                    </>
                                )
                            }
                        </Computed>

                        <Computed>
                            {({ domain, pathPrefix, forwardPathPrefix }) =>
                                domain && (
                                    <div>
                                        <div className="text-lg font-semibold mb-1">
                                            Domain Preview
                                        </div>
                                        <div className="font-mono text-gray-900">
                                            {domain}
                                            {forwardPathPrefix && pathPrefix && (
                                                <span className="text-gray-500">
                                                    <span className="mx-1">/</span>
                                                    {pathPrefix}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                        </Computed>
                    </div>
                </ModalContent>
                <ModalFooter>
                    <ButtonGroup>
                        <Button onClick={onClose}>Cancel</Button>
                        <SubmitButton>Create</SubmitButton>
                    </ButtonGroup>
                </ModalFooter>
            </Form>
        </Modal>
    );
}
