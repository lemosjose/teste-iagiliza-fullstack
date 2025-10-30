import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY; 
if(!apiKey) {
  throw new Error("Configure the api key for google' gemini, you can create a project in aistudio for free");
}

const Morpehus = new GoogleGenerativeAI(apiKey)
const model = Morpehus.getGenerativeModel({ model: "gemini-1.5-flash"});

export default async function answerUser(content: string) {
    try{ 
        const res = await model.generateContent(content)
        const answerUser = res.response.text();
        return answerUser || "Sorry, i couldn't formulate an answer";
    } catch (error) {
        console.error("Error generating content:", error);
        return "Sorry, i couldn't formulate an answer";
    }
}


//backup in case the user doesn't want to provide an api key for gemini 
