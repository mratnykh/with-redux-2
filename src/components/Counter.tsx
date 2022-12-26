import { useStore } from '../lib/zustandProvider'
import shallow from 'zustand/shallow'
import {useEffect, useState} from "react";

const useCounter = () => {
    const { fetchValue, count, increment, decrement, reset } = useStore(
        (store) => ({
            count: store.count,
            increment: store.increment,
            decrement: store.decrement,
            reset: store.reset,
            fetchValue: store.fetchValue,
        }),
        shallow
    )

    return { fetchValue, count, increment, decrement, reset }
}

const Counter = () => {
    const { fetchValue, count, increment, decrement, reset } = useCounter()
    const { incrementPersist, persistValue } = useStore(
        (store) => ({
            persistValue: store.persistValue,
            incrementPersist: store.incrementPersist,
        }),
    )

    let [localPersistValue, setLocalPersistValue] = useState(0);

    useEffect(() => {
        setLocalPersistValue(persistValue);
    })

    return (
        <div>
            <h1>
                Count: <span>{count}</span>
            </h1>
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
            <button onClick={reset}>Reset</button>
            <h2>
                Observable value: <span>{fetchValue}</span>
            </h2>
            <h2>
                Persisted value: <span>{localPersistValue}</span>
            </h2>
            <button onClick={incrementPersist}>+1</button>
        </div>
    )
}

export default Counter
