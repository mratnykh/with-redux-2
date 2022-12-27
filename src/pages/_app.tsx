import Layout from '../components/layout'
import { useHydrate } from "../store";
import { StoreProvider } from '../lib/zustandProvider'
import { share, isSupported } from "../lib/sharedSubscribe";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
    const store = useHydrate(pageProps.initialZustandState)

    useEffect(() => {
        if (isSupported()) {
            const storeSharer = share(store)
            return storeSharer('fetchValue')
        }
    })


    return (
        <StoreProvider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </StoreProvider>
    );
}
