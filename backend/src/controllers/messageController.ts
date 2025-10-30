//TODO: UPDATE USER THROUGH PATCH QUERY

import type { FastifyReply, FastifyRequest } from "fastify";
import type { MessageBody, MessageReply } from "../types/message.types.js";
import type { ErrorReply } from "../types/auth.types.js";

import { messageSchema } from "../schemas/zod.js";

import { prisma } from "../lib/prisma.js";

import answerUser from "../services/aigen.js";

import { aiResponses } from "../lib/variables.js";

import z from "zod";

//using the identation and style from fastify's typescript docs
// https://fastify.dev/docs/latest/Reference/TypeScript/
export const sendMessage = async (
    request: FastifyRequest<{
        Body: MessageBody;
        Reply: MessageReply | ErrorReply
    }> ,
    reply: FastifyReply
) => {
    try{ 
        await request.jwtVerify();

        const userId = request.user.id;

        const messageData = messageSchema.parse(request.body)

        const userMessage = await prisma.message.create({ 
            data: { 
                content: messageData.content, 
                role: "USER", 
                user: { 
                    connect: { 
                        id: userId
                    }
                }
            }
        })

        //gets Morpheus to answer 
        const aiContent = await answerUser(userMessage.content) || "A função da IA retornou um erro, verifique seu login ou seu ambiente"; 

        const aiMessage = await prisma.message.create({ // <-- NOVO
            data: {
                content: aiContent,
                role: "AI", 
                user: {
                    connect: {
                        id: userId // Vinculado ao mesmo usuário
                    }
                }
            }
        });

        //the user should not get anything in case the message is successful, just a reply
        return reply.code(200).send();


    }catch (error){
        if(error instanceof z.ZodError){ 
            return reply.code(400).send("Você enviou dados inválidos");
        }

        return reply.code(500).send("Não permitido")
    };
}


export const getMessages = async(
    request: FastifyRequest, 
    reply: FastifyReply
) => { 
    try{ 

        await request.jwtVerify();

        const userId = request.user.id;

        const messages = await prisma.message.findMany({
            where: { userId: userId},

            select: {
                content: true,
                role: true,
            }
        })

        return reply.code(200).send(messages);



    } catch (error) { 
        return reply.code(500).send({ error: "Erro no servidor"})
    }
}