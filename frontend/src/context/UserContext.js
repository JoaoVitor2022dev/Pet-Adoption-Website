import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext() 

function UserProvider({ children }) {
    const { register, authenticated, redirect } = useAuth()

    return <Context.Provider value={{  authenticated ,register, redirect }}>
        {children}
    </Context.Provider>
}

export { Context, UserProvider }