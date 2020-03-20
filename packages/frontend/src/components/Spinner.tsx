import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export default function Spinner({ size = 'default' }: { size?: 'default' | 'large' }) {
    return (
        <LoadingContainer>
            <Spin size={size} />
        </LoadingContainer>
    );
}
