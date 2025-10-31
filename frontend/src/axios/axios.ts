import axios, { isAxiosError } from "axios";
import type { loginData } from "@/types/dataInterfaces";

//"axios.ts" cuz the instance is here.

//axios instance and basic functions that are not related to any operation in specific that returns data

export const axiosInstance = axios.create({
    //change that for your ip in case of production use
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
    timeout: 10000,
    headers: { 'Content-Type': "application/json" },
}
)

export const loginUser = async (loginData: loginData): Promise<{ token: string }> => {
    try {
        const response = await axiosInstance.post('/login', {
            email: loginData.email,
            password: loginData.password
        });

        if (response.data && response.data.token) {
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