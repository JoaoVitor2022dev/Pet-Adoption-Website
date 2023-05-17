import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext() 

function UserProvider({ children }) {
    const { register, authenticated, redirect, logout } = useAuth()

    return <Context.Provider value={{  authenticated ,register, redirect, logout }}>
        {children}
    </Context.Provider>
}

export { Context, UserProvider }