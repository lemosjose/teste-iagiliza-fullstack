import { isAxiosError } from "axios";

import { axiosInstance } from "./axios";

import type { userData, messageData } from "@/types/dataInterfaces";
import type { MessageCard } from "@/types/componentInterfaces";

export const registerUser = async (userData: userData): Promise<void> => {
    try {
        const reponse = await axiosInstance.post('/register', {
            //mapping like the prisma schema
            name: userData.name,
            email: userData.email,
            password: userData.password
        }
        )

        return reponse.data
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response) {
                let apiErrorMessage = error.response.data?.message || "Ocorreu um erro";
                console.error('Erro da API:', error.response.data)
                throw new Error(apiErrorMessage)
            }
            else {
                console.error("Não foi possível obter uma resposta", error.message);
                throw new Error("Não conseguimos realizar a requisição")
            }
        }

        console.error("Erro desconhecido", error);
        throw new Error("Desconhecido");
    }
}

export const postMessage = async(messageData: messageData): Promise<MessageCard[]> => { 
    try{ 

        const token = localStorage.getItem("authToken");

        if(!token){
            throw Error("Não autenticado! Faça login")
        }

        const response = await axiosInstance.post('/message', 
        { 
            content: messageData.content
        }, 
        { 
            headers: { 
                Authorization: `Bearer ${token}`
            }
        }
    )

        return response.data
    } catch(error){ 
        if(isAxiosError(error)){ 
            if(error.response){
                let apiErrorMessage = error.response.data?.message || "Ocorreu um erro";
                console.error('Erro da API:', error.response.data)
                throw new Error(apiErrorMessage)
            }

            console.error("Não foi possível obter resposta da API: ", error.message); 
            throw new Error("não conseguimos enviar sua mensagem")
        }

        console.error("Erro desconhecido", error); 
        throw new Error("Desconhecido")
    }
}