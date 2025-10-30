import { isAxiosError } from "axios";

import { axiosInstance } from "./axios";

import type { updateUserName, updateUserEmail } from "@/types/dataInterfaces";

export const patchUserName = async(updateUserData: updateUserName): Promise<void> => { 
    try{ 
        const token = localStorage.getItem("authToken");

        if(!token){
            throw new Error("Faça login! ainda não autorizado");
        }


        const response = await axiosInstance.patch(
            '/me/updateName', 
            { 
                name: updateUserData.name,
            },
            { 
                headers: { 
                    Authorization: `Bearer ${token}`
                },
            },
        )

        return response.data;
    } catch (error) { 
        if (isAxiosError(error)){
            console.error("erro pela api", error.response?.data || error.message);

            throw error.response?.data || new Error("Não conseguimos encontrar o perfil")
        }

        throw new Error("Erro desconhecido")
    }
}

export const patchUserEmail = async(updateUserData: updateUserEmail): Promise<void> => { 
    try{ 
        const token = localStorage.getItem("authToken");

        if(!token){
            throw new Error("Faça login! ainda não autorizado");
        }


        const response = await axiosInstance.patch(
            '/me/updateEmail', 
            { 
                email: updateUserData.email,
            },
            { 
                headers: { 
                    Authorization: `Bearer ${token}`
                },
            },
        )

        return response.data;
    } catch (error) { 
        if (isAxiosError(error)){
            console.error("erro pela api", error.response?.data || error.message);

            throw error.response?.data || new Error("Não conseguimos encontrar o perfil")
        }

        throw new Error("Eerro desconhecido")
    }
}
