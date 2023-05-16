import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// hook de flash messagens 
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
 
    const { setFlasMessage } = useFlashMessage();

    async function register(user) {
 
        let msgText = "Cadastro realizado com sucesso!"; 
        let msgType = "sucess";
        
        try {
         const data = await api.post('/users/register', user).then((response) => { 
            return response.data
         }) 
           
         console.log(data);
        } catch (err) {
            msgText = err.response.data.message 
            msgType = "err";    
        }

        setFlasMessage(msgText,msgType);
    }
    return { register }
}


