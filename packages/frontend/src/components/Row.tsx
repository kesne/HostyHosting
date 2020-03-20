// TODO: Deprecate now that we can easily do this with tailwind.
import React  from 'react';
import styled from 'styled-components';

const Container = styled.div<{ alignItems?: string }>`
    display: flex;
    align-items: ${props => props.alignItems ?? 'center'};
`;

const Before = styled.div`
    margin-right: 8px;
`;

const Content = styled.div`
    flex: 1;
`;

const After = styled.div`
    margin-left: 8px;
`;

type Props = {
    alignItems?: string;
    before?: any;
    children: any;
    after?: any;
};

export default function Row({ before, after, alignItems, children }: Props) {
    return (
        <Container alignItems={alignItems}>
            {before && <Before>{before}</Before>}
            <Content>{children}</Content>
            {after && <After>{after}</After>}
        </Container>
    );
}
