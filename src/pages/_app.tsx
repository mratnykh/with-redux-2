import Layout from '../components/layout'
import useStore from "../store";
import {useEffect} from "react";

export default function App({ Component, pageProps }) {
    const { initialZustandState = {}, ...rest } = pageProps;
    const hydrateState = useStore((state) => state.hydrateState);

    useEffect(() => {
      hydrateState(initialZustandState);
    });

    return (
        <Layout>
            <Component {...rest} />
        </Layout>
    );
}
