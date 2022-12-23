import { useEffect } from "react";
import useStore from "../store";
import epicMiddleware from '../lib/epicMiddleware';

const counterLink = 'http://localhost:3000/api/counter';

const FetchValueSetter = () => {
    const { setFetchValue } = useStore((state) => state);

    useEffect(() => {
        // пока что проблема в том, что если страница открыта на двух вкладках, то
        // запросы будут отправляться на обеих сразу.
        return epicMiddleware(counterLink, setFetchValue, 3000);
    }, [])

    return (
        <p>
            Entering this page initializes API calls for every 3 seconds. Calls stop after leaving the page.
        </p>
    );
};

export default FetchValueSetter;