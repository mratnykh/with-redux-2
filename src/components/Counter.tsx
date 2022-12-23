import useStore from "../store";
import {useEffect, useState} from "react";

const Counter = () => {
    const { count, increment, decrement, reset, persistValue, incrementPersist } = useStore((state) => state);
    let [localPersistValue, setLocalPersistValue] = useState(0);

    useEffect(() => {
        setLocalPersistValue(persistValue);
    })

    return (
        <div>
            <h1>
                Store Count: <span>{count}</span>
            </h1>
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
            <button onClick={reset}>Reset</button>
            <h2>
                Persisted value: <span>{localPersistValue}</span>
            </h2>
            <button onClick={incrementPersist}>+1</button>
        </div>
    );
};

export default Counter;
