import { createContext, useContext, useMemo } from "react";
import { initStore } from "../store";

export const StoreContext = createContext(null);

export function useHydrate(initialState) {
    const state =
        typeof initialState === 'string' ? JSON.parse(initialState) : initialState

    const store = useMemo(() => initializeStore(state), [state])
    return store
}

export const Provider = ({ children, createState }) => {
    const store = useHydrate(createState, initStore);
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export function useProviderStore(selector, equalityFn) {
    const store = useContext(StoreContext);

    const values = store(selector, equalityFn);

    return values;
}

let store;
export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Zustand state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}
