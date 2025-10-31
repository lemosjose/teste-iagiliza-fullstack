import { isAxiosError } from "axios";

import { axiosInstance } from "./axios";

import type { userData, messageData, PostMessageResponse } from "@/types/dataInterfaces";
import type { Chat } from "@/types/dataInterfaces";

export const registerUser = async (userData: userData): Promise<void> => {
    try {
        await axiosInstance.post('/register', {
            //mapping like the prisma schema
            name: userData.name,
            email: userData.email,
            password: userData.password
        }
        )

    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response) {
                let apiErrorMessage = error.response.data?.error || "Ocorreu um erro ao conectar-se com a API";
                console.error('Erro da API:', error.response.data)
                throw new Error(apiErrorMessage)
            }
            else {
                console.error("Não foi possível obter uma resposta da API", error.message);
                throw new Error("Não conseguimos realizar a requisição")
            }
        }

        console.error("Erro desconhecido", error);
        throw new Error("Desconhecido");
    }
}

export const postMessage = async(messageData: messageData): Promise<PostMessageResponse> => { 
    try{ 

        const token = localStorage.getItem("authToken");

        if(!token){
            throw Error("Não autenticado! Faça login")
        }

        const response = await axiosInstance.post('/message', messageData, 
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
                let apiErrorMessage = error.response.data?.message || "Ocorreu um erro na conexão com a API";
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

export const createChat = async (payload: { title?: string | null }): Promise<Chat> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Faça login! Não autorizado");
    }

    // Envia o payload (pode ser {} ou { title: "..." })
    const response = await axiosInstance.post('/chat', payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Retorna o objeto do novo chat criado
    return response.data;

  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Erro na API ao criar chat", error.response?.data || error.message);
      throw error.response?.data || new Error("Não foi possível criar um novo chat");
    }
    throw new Error("Erro desconhecido");
  }
}