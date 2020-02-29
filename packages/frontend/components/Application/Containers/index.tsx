import { Button, Row } from 'antd';
import Container from './Container';

export default function Containers() {
    return (
        <div>
            <Button>Create Container</Button>
            <Row>
            <Container />
            <Container />
            </Row>
        </div>
    );
}
