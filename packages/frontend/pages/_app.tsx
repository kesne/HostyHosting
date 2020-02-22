import 'antd/dist/antd.min.css';
import Layout from '../components/Layout';

type Props = {
    Component: React.ComponentType;
    pageProps: Record<string, unknown>;
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: Props) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
