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
     setRedirect(true)

     },[]);  

    async function register(user) {
 
        let msgText = "Cadastro realizado com sucesso!"; 
        let msgType = "sucess";
        
        try {
         const data = await api.post('/users/register', user).then((response) => { 
            return response.data
         }) 
           
        await authUser(data);

        } catch (err) {
            msgText = err.response.data.message 
            msgType = "err";    
        }
        setFlasMessage(msgText,msgType); 
    }

 
    // authentication 

    async function authUser(data) {
        
    setAuthenticated(true)

    localStorage.setItem('token', JSON.stringify(data.token))

    // redirect 
    console.log("redirect");

    }

    // login 

    async function login(user) {
        let msgText = "Login realizado com sucesso";
        let msgType = "sucess"; 

        try {

         const data = await api.post("/users/login", user).then((response) => {
            return response.data
         });    
          
         await authUser(data);

        } catch (err) {
            msgText = err.response.data.message
            msgType = "err"
        }
 
        setFlasMessage(msgText,msgType);
    }

    // logout

    function logout() {
        const msgText = 'Logout realizado com sucesso!'; 
        const msgType = 'sucess';

        // mudar o authenticaçao 
        setAuthenticated(false); 

        // remover o token do local storage 
        localStorage.removeItem('token')

        // tirar da api de dentro do header 
        api.defaults.headers.Authorization = undefined


        setFlasMessage(msgText,msgType);
    }

    return { register, authenticated, redirect, logout, login }
}


