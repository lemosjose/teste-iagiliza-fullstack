import { axiosInstance } from "./axios";

import { isAxiosError } from "axios";

export const getUserData = async(): Promise<{ name: string, email: string}> => { 
    try{ 
        const token = localStorage.getItem("authToken");

        if(!token){
            throw new Error("Faça login! ainda não autorizado");
        }


        const response = await axiosInstance.get('/me', { 
            headers: { 
                Authorization: `Bearer ${token}`,
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
