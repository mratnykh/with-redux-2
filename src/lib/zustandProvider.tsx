import { createContext, useContext } from 'react'
import shallow from "zustand/shallow";

export const StoreContext = createContext(null)

export const StoreProvider = ({ children, store }) => {
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = (selector, eqFn = shallow) => {
    const store = useContext(StoreContext)
    const values = store(selector, eqFn)

    return values
}
