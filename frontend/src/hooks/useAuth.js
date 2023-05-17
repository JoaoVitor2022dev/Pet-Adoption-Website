import api from "../utils/api";

import { useState, useEffect } from "react";


// hook de flash messagens 
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
     
    const [redirect, setRedirect] = useState(false); 

    const { setFlasMessage } = useFlashMessage();


    useEffect(() => { 
    
     const token = localStorage.getItem("token")
   
     if (token) {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
     }

     setAuthenticated(true)

     },[])

    async function register(user) {
 
        let msgText = "Cadastro realizado com sucesso!"; 
        let msgType = "sucess";
        
        try {
         const data = await api.post('/users/register', user).then((response) => { 
            return response.data
         }) 
           
        await authUser(data);

        setRedirect(true);

        } catch (err) {
            msgText = err.response.data.message 
            msgType = "err";    
            setRedirect(false);
        }
        setFlasMessage(msgText,msgType); 
    }

    async function authUser(data) {
        
    setAuthenticated(true)

    localStorage.setItem('token', JSON.stringify(data.token))

    // redirect 
    console.log("redirect");

    }

    console.log(redirect);

    return { register, authenticated, redirect }
}


