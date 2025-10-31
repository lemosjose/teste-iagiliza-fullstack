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

        const messageData = messageSchema.parse(request.body);

        let chatId = messageData.chatId; 

        if(!chatId){ 
            const latestChat = await prisma.chat.findFirst({
                where: {userId},
                orderBy: {updatedAt: 'desc'}
            })

            if(latestChat){ 
                chatId = latestChat.id; 
            } else { 
                const newChat = await prisma.chat.create({ 
                    data: { 
                        userId,
                        title: "Conversa 1"
                    }
                }); 
                chatId = newChat.id
            }
        };

        const userMessage = await prisma.message.create({ 
            data: { 
                content: messageData.content, 
                role: "USER", 
                chatId
            }
        });

        //gets Morpheus to answer 
        const aiContent = await answerUser(userMessage.content) || "A função da IA retornou um erro, verifique seu login ou seu ambiente"; 

        // currently not inserting the aiResponses misc answer, can be done if someone does not know how to use a gemini_api_key

        const aiMessage = await prisma.message.create({ // <-- NOVO
            data: {
                content: aiContent,
                role: "AI", 
                chatId
            }
        });

        //the user should not get anything in case the message is successful, just a reply
        return reply.code(200).send({
            aiContent, 
            chatId
        });


    }catch (error){
        if(error instanceof z.ZodError){ 
            return reply.code(400).send("Você enviou dados inválidos");
        }

        return reply.code(500).send("Não permitido")
    };
}


export const getMessages = async(
    request: FastifyRequest<{
        //optional just for getting it into index.ts
        Querystring: { chatId?: string }
    }>, 
    reply: FastifyReply
) => { 
    try{ 

        await request.jwtVerify();

        const userId = request.user.id;
        let { chatId } = request.query;

        if(!chatId){
            const latestChat = await prisma.chat.findFirst({
                where: {userId},
                orderBy: {updatedAt: 'desc'},

                select: {
                    id: true, 
                    title: true
                }
            })

            if(latestChat){ 
                chatId = latestChat.id; 
            } else { 
                const newChat = await prisma.chat.create({ 
                    data: { 
                        userId,
                        title: "Conversa 1"
                    }
                }); 
                chatId = newChat.id
            }
        };

        const chat = await prisma.chat.findFirst({
            where: { 
                id: chatId, 
                userId
            }
        })

        if(!chat) { 
            return reply.code(403).send({ error: "Chat não encontrado"});
        }

        const messages = await prisma.message.findMany({
            where: { chatId },

            orderBy: { 
                createdAt: 'asc',
            },
            select: {
                id: true, 
                content: true,
                role: true,
                createdAt: true
            }
        })

        return reply.code(200).send({
            chat: chatId,
            messages: messages
        });



    } catch (error) { 
        return reply.code(500).send({ error: "Erro no servidor"})
    }
}