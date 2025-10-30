import { GoogleGenerativeAI } from "@google/generative-ai";
import { aiResponses } from "../lib/variables.js";


const apiKey = process.env.GEMINI_API_KEY; 
if(!apiKey) {
  throw new Error("Configure the api key for google' gemini, you can create a project in aistudio for free");
}


//Morpheus is the true AI, scaped from the Matrix, "roboed" is a fake pretender
const Morpheus = new GoogleGenerativeAI(apiKey)
const model = Morpheus.getGenerativeModel({ model: "gemini-2.5-flash-lite"});

export default async function answerUser(content: string) {
    try{ 
        const res = await model.generateContent(content)
        const answerUser = res.response.text();
        return answerUser || 
        //returns something random in the case of not having an api key 
        aiResponses[Math.floor(Math.random()*aiResponses.length)];
    } catch (error) {
        console.error("Error generating content:", error);
        //does not leave the user without an answer, this needs to be a simulation of a chat anyways
        return aiResponses[Math.floor(Math.random()*aiResponses.length)];
    }
}


//backup in case the user doesn't want to provide an api key for gemini 
// export default async function babbleGenerator(content: string){ 
//    try{ 
//}
//}