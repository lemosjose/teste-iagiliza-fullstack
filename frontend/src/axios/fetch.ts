import { axiosInstance } from "./axios";

import { isAxiosError } from "axios";

import type { MessageCard } from "@/types/componentInterfaces";

export const getUserData = async(): Promise<{ name: string, email: string}> => { 
    try{ 
        const token = localStorage.getItem("authToken");

        if(!token){
            throw new Error("Faça login! ainda não autorizado");
        }


        const response = await axiosInstance.get('/me', { 
            headers: { 
                Authorization: `Bearer ${token}`,
                //prevents problems while updating and showing the same user, or messing up stuff
                // still, when testing locally, restart sometimes and try to discard cache problems while testing
                'Cache-Control': 'no-cache'
            }
        })

        console.log("Response:", response)
        console.log("Response status", response.status)
        return response.data;
    } catch (error) { 
        if (isAxiosError(error)){
            console.error("erro pela api", error.response?.data || error.message);

            throw error.response?.data || new Error("Não conseguimos encontrar o perfil")
        }

        throw new Error("Eerro desconhecido")
    }
}

export const getMessages = async(): Promise<MessageCard[]> => { 
    try{
        const token = localStorage.getItem("authToken"); 

        if(!token){
            throw new Error("Faça login! ainda não autorizado"); 
        }

        const response = await axiosInstance.get('/messages', { 
            headers: { 
                Authorization: `Bearer ${token}`,
                'Cache-Control': 'no-cache'
            }
        })

        return response.data;
        
    }catch (error){
            if(isAxiosError(error)){ 
                console.error("erro na api", error.response?.data || error.message); 

                throw error.response?.data || new Error("Não conseguimos encontrrar mensagens para esse perfil")
            }

            throw new Error("Erro desconhecido")
    }
}
