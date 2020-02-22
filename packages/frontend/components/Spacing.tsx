import styled from 'styled-components';

type Props = {
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
};

const UNIT = 8;

const Spacing = styled.div<Props>`
    margin-left: ${props => (props.left ?? 0) * UNIT}px;
    margin-right: ${props => (props.right ?? 0) * UNIT}px;
    margin-top: ${props => (props.top ?? 0) * UNIT}px;
    margin-bottom: ${props => (props.bottom ?? 0) * UNIT}px;
`;

export default Spacing;
