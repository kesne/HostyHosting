import { useReducer } from 'react';
import produce from 'immer';
import styled from 'styled-components';
import { Button, Input, Typography, Row, Col } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const SecretContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

const StyledInput = styled(Input)`
    flex: 1;
    margin-right: 16px;
`;

export default function Settings() {
    const [state, dispatch] = useReducer(
        produce(
            (draft: { key: string; value: string }[], action: { type: string; payload?: any }) => {
                switch (action.type) {
                    case 'ADD':
                        draft.push({ key: '', value: '' });
                        break;
                    case 'REMOVE':
                        draft.splice(action.payload, 1);
                        break;
                    case 'CHANGE_KEY':
                        draft[action.payload.index].key = action.payload.value;
                        break;
                    case 'CHANGE_VALUE':
                        draft[action.payload.index].value = action.payload.value;
                        break;
                }
            }
        ),
        []
    );

    function onFinish() {}

    return (
        <Row>
            <Col span={6}>
                <Typography.Title level={4}>Secrets</Typography.Title>
                <Typography.Paragraph>
                    Manage environment variables that will be set when your application starts.
                </Typography.Paragraph>
            </Col>
            <Col span={18}>
                {state.map(({ key, value }, index) => {
                    return (
                        <SecretContainer key={index}>
                            <StyledInput
                                value={key}
                                onChange={e =>
                                    dispatch({
                                        type: 'CHANGE_KEY',
                                        payload: { index, value: e.target.value }
                                    })
                                }
                                placeholder="KEY"
                            />
                            <StyledInput
                                value={value}
                                onChange={e =>
                                    dispatch({
                                        type: 'CHANGE_VALUE',
                                        payload: { index, value: e.target.value }
                                    })
                                }
                                placeholder="VALUE"
                            />

                            <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => {
                                    dispatch({ type: 'REMOVE', payload: index });
                                }}
                            />
                        </SecretContainer>
                    );
                })}
                <Button
                    type="dashed"
                    onClick={() => {
                        dispatch({ type: 'ADD' });
                    }}
                    style={{ width: '100%' }}
                >
                    <PlusOutlined /> Add Secret
                </Button>
            </Col>
        </Row>
    );
}
