import styled from 'styled-components';
import { Typography, Card } from 'antd';
import Spacing from '../Spacing';

type Props = {
    title: string;
    children: NonNullable<React.ReactNode>;
};

// TODO: better responsive shit
const AuthContainer = styled.div`
    width: 400px;
    margin: 0 auto;
`;

export default function Container({ title, children }: Props) {
    return (
        <AuthContainer>
            <Spacing top={8}>
                <Card>
                    <Typography.Title>{title}</Typography.Title>
                    {children}
                </Card>
            </Spacing>
        </AuthContainer>
    );
}
