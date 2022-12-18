import { createContext, useContext, useMemo } from "react";
import { initStore } from "../store";

export const StoreContext = createContext(null);

export function useHydrate(initialState, initFn) {
    const state =
        typeof initialState === "string" ? JSON.parse(initialState) : initialState;

    const store = useMemo(() => initializeStore(state, initFn), [state, initFn]);
    return store;
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
export function initializeStore(initialData = null, initFn) {
    const _store = store ?? initFn();

    // If your page has Next.js data fetching methods that use a zustand store, it will
    // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
    if (initialData) {
        _store.setState(initialData);
    }
    // For SSG and SSR always create a new store
    if (typeof window === "undefined") return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
}
