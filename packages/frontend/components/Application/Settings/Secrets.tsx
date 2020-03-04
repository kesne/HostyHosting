import { useState } from 'react';
import { Button, Input } from 'antd';
import styled from 'styled-components';
import { MinusCircleOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Application, useUpdateApplicationMutation, Secret } from '../../../queries';
import EditSecret from './EditSecret';

const SecretContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

const StyledInput = styled(Input)`
    flex: 1;
    margin-right: 16px;
`;

const ControlsContainer = styled.div`
    width: 100px;
    display: flex;
    justify-content: flex-end;
`;

const IconContainer = styled.div`
    font-size: 20px;
    margin-left: 8px;
`;

export type Props = {
    application: Pick<Application, 'id' | 'secrets'>;
};

export default function Secrets({ application }: Props) {
    const [editing, setEditing] = useState<Secret | null>(null);
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [updateApplication, { loading }] = useUpdateApplicationMutation();

    async function handleAddSecret() {
        await updateApplication({
            variables: {
                id: application.id,
                secret: {
                    key,
                    value
                }
            }
        });
        setKey('');
        setValue('');
    }

    return (
        <>
            <EditSecret id={application.id} secret={editing} onClose={() => setEditing(null)} />
            {application.secrets.map((secret, index) => {
                return (
                    <SecretContainer key={index}>
                        <StyledInput disabled value={secret.key} placeholder="KEY" />
                        <StyledInput disabled value={secret.value} placeholder="VALUE" />

                        <ControlsContainer>
                            <IconContainer>
                                <EditOutlined onClick={() => setEditing(secret)} />
                            </IconContainer>
                            <IconContainer>
                                <MinusCircleOutlined
                                // onClick={() => {
                                //     dispatch({ type: 'REMOVE', payload: index });
                                // }}
                                />
                            </IconContainer>
                        </ControlsContainer>
                    </SecretContainer>
                );
            })}
            <SecretContainer>
                <StyledInput
                    disabled={loading}
                    value={key}
                    onChange={e => setKey(e.target.value)}
                    placeholder="KEY"
                />
                <StyledInput
                    disabled={loading}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="VALUE"
                />

                <ControlsContainer>
                    <Button onClick={handleAddSecret} loading={loading}>
                        <PlusOutlined /> Add
                    </Button>
                </ControlsContainer>
            </SecretContainer>
        </>
    );
}
