import create from "zustand";
import { persist } from 'zustand/middleware'
import mergeDeepRight from "ramda/src/mergeDeepRight"

const initialState = {
  count: 0,
  isInitial: true,
  persistValue: 0,
};

const persistedKeys = ['persistValue'];

const useStore = create(
    persist(
    (set, get) => ({
    ...initialState,
    hydrateState: (hydratedState) => {
      const state = get();

      if (state.isInitial) {
        const mergedState = mergeDeepRight(state, hydratedState);
        set({ ...mergedState, isInitial: false });
      } else {
        set(mergeDeepRight(hydratedState, state));
      }
    },
    increment: () => {
      set({
        count: get().count + 1
      });
    },
    decrement: () => {
      set({
        count: get().count - 1
      });
    },
    reset: () => {
      set({
        count: initialState.count
      });
    },
    incrementPersist: () => {
        set({
            persistValue: get().persistValue + 1
        });
    },
  }),
  {
    name: 'koltron-next-storage', // name of item in the storage (must be unique),
    getStorage: () => localStorage,
    partialize: (state) =>
      Object.fromEntries(
        Object.entries(state).filter(([key]) => persistedKeys.includes(key))
      ),
  },
))

export default useStore;
