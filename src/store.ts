import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'

import { combineReducers } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";


const combinedReducer = combineReducers({ counter: counterReducer });

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return combinedReducer(state, action);
  }
}


export function makeStore() {
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export const wrapper = createWrapper(makeStore, { debug: true });

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;

const store = makeStore()
export default store
