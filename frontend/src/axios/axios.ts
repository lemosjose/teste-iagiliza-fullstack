import axios, { isAxiosError } from "axios";
import type { userData, loginData } from "@/types/dataInterfaces";
//necessary for changing stuff in production 
const API_BASE_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 10000,
        headers: {'Content-Type': "application/json"},
    }
)

export const registerUser = async (userData: userData): Promise<any> => {
    try{
        const reponse = await axios.post(`${API_BASE_URL}/register`, { 
            //mapping like the prisma schema
            name: userData.name, 
            email: userData.email, 
            password: userData.password
        }
        )

        return reponse.data
    }catch(error){
        if(isAxiosError(error)){ 
            if(error.response){ 
                let apiErrorMessage = error.response.data?.message || "Ocorreu um erro";
                console.error('Erro da API:', error.response.data)
                throw new Error(apiErrorMessage)
            }
            else{
                console.error("Não foi possível obter uma resposta", error.message); 
                throw new Error("Não conseguimos realizar a requisição")
            }
        }

        console.error("Erro desconhecido", error); 
        throw new Error("Desconhecido");
    }
}

export const loginUser = async (loginData: loginData): Promise<{ token: string }> => {
   try{ 
       const response = await axios.post(`${API_BASE_URL}/login`, { 
        email: loginData.email, 
        password: loginData.password
       });

       if (response.data && response.data.token){ 
        localStorage.setItem("authToken", response.data.token);
        
        return response.data;

       } else {
        throw new Error("Resposta inválida")
       }
    } catch (error) {
        if (isAxiosError(error)) {
           console.error("Erro de API:", error.response?.data || error.message);
           throw error.response?.data || new Error("Erro desconhecido no login");
       }

       console.error("Não foi possível fazer o login", error);
       throw new Error("Erro no login");
    }
}

