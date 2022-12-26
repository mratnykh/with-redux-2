import Layout from '../components/layout'
import { useHydrate } from "../store";
import { StoreProvider } from '../lib/zustandProvider'
import { isSupported, share } from "shared-zustand";

export default function App({ Component, pageProps }) {
    const store = useHydrate(pageProps.initialZustandState)
    if ("BroadcastChannel" in globalThis || isSupported()) {
        // share the property "fetchValue" of the state with other tabs
        share('fetchValue', store);
    }

    return (
        <StoreProvider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </StoreProvider>
    );
}
