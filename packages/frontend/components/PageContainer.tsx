import styled from 'styled-components';
import { Layout } from 'antd';

export default styled(Layout.Content)`
    padding: 32px;
    margin: 0 auto;
    width: 100%;

    @media (min-width: 576px) {
        width: 100%;
    }

    @media (min-width: 768px) {
        width: 540px;
    }

    @media (min-width: 768px) {
        width: 720px;
    }

    @media (min-width: 992px) {
        width: 960px;
    }

    @media (min-width: 1200px) {
        width: 1140px;
    }
`;
