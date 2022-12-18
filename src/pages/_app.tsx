import { Provider } from "../lib/zustandMiddleware";
import Layout from '../components/layout'

export default function App({ Component, pageProps }) {
    const { initialZustandState, ...rest } = pageProps;

    return (
        <Provider createState={initialZustandState}>
            <Layout>
                <Component {...rest} />
            </Layout>
        </Provider>
    );
}
