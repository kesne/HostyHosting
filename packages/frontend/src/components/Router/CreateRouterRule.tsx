import React from 'react';
import Modal, { ModalContent, ModalFooter } from '../ui/Modal';
import Button, { ButtonGroup } from '../ui/Button';
import SubmitButton from '../forms/SubmitButton';
import Form from '../forms/Form';
import Input from '../forms/Input';
import Computed from '../forms/Computed';
import Checkbox from '../forms/Checkbox';
import SearchApplications from './SearchApplications';
import SearchComponents from './SearchComponents';
import SearchEnvironments from './SearchEnvironments';
import Preview from './Preview';
import { useMutation, graphql } from 'react-relay/hooks';
import { CreateRouterRuleMutation } from './__generated__/CreateRouterRuleMutation.graphql';
import { useParams } from 'react-router';

type Props = {
    open: boolean;
    onClose(): void;
    organization: string;
};

export default function CreateRouterRule({ open, onClose, organization }: Props) {
    const params = useParams();
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
                    routerID: params.router,
                    componentID: values.component,
                    environmentID: values.environment,
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
                        <Input label="Domain" name="domain" register={{ required: true }} />
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

                        <SearchEnvironments organization={organization} />

                        <SearchApplications organization={organization} />

                        <Computed>
                            {({ application }) =>
                                application && <SearchComponents application={application} />
                            }
                        </Computed>

                        <Computed>
                            {({
                                domain,
                                environment,
                                component,
                                pathPrefix,
                                forwardPathPrefix,
                            }) => (
                                <Preview
                                    component={component}
                                    environment={environment}
                                    domain={domain}
                                    pathPrefix={pathPrefix}
                                    forwardPathPrefix={forwardPathPrefix}
                                />
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
