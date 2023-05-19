import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext() 

function UserProvider({ children }) {
    const { register, authenticated, redirect, logout, login } = useAuth()

    return <Context.Provider value={{  authenticated ,register, redirect, logout, login }}>
        {children}
    </Context.Provider>
}

export { Context, UserProvider }