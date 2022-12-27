import create from "zustand";
import { useMemo } from 'react';
import { persist, subscribeWithSelector } from 'zustand/middleware'

const initialState = {
  count: 0,
  isInitial: true,
  persistValue: 0,
  fetchValue: 0,
};

let store
const persistedKeys = ['persistValue'];

function initStore(preloadedState = initialState) {
    // @ts-ignore
    return create(persist(subscribeWithSelector((set, get) => ({
        ...initialState,
        ...preloadedState,
        setCountValue: (value) => {
            set({
                count: value,
            })
        },
        setFetchValue: (value) => {
            set({
                fetchValue: value,
            })
        },
        incrementPersist: () => {
            set({
                persistValue: get().persistValue + 1,
            })
        },
        increment: () => {
            set({
                count: get().count + 1,
            })
        },
        decrement: () => {
            set({
                count: get().count - 1,
            })
        },
        reset: () => {
            set({
                count: initialState.count,
            })
        },
    })),
    {
        name: 'koltron-next-storage', // name of item in the storage (must be unique),
        getStorage: () => localStorage,
        partialize: (state) =>
            Object.fromEntries(
                Object.entries(state).filter(([key]) => persistedKeys.includes(key))
            ),
    })
)}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Zustand state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...preloadedState,
            ...store.getState(),
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

export function useHydrate(initialState) {
    const state =
        typeof initialState === 'string' ? JSON.parse(initialState) : initialState
    const store = useMemo(() => initializeStore(state), [state])
    return store
}
