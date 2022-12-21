import create from "zustand";
// import persist from './lib/persist'

const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
};

export function useStore(preloadedState = initialState) {
  return create(
    (set, get) => ({
    ...initialState,
    ...preloadedState,
    tick: (lastUpdate, light) => {
      set({
        lastUpdate,
        light: !!light
      });
    },
    setCount: (count) => {
      set({
        // @ts-ignore
        count: count,
      });
    },
    increment: () => {
      set({
        // @ts-ignore
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
    }
  }),
  );
}
