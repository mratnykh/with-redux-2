import { Provider } from "../lib/zustandMiddleware";
import Layout from '../components/layout'
// import { PersistGate } from 'zustand-persist'

export default function App({ Component, pageProps }) {
    const { initialZustandState, ...rest } = pageProps;

    return (
        <Provider createState={initialZustandState}>
            {/*<PersistGate>*/}
                <Layout>
                    <Component {...rest} />
                </Layout>
            {/*</PersistGate>*/}
        </Provider>
    );
}
