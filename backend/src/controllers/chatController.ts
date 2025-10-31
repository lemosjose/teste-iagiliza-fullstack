import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma.js";

export const getChats = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        await request.jwtVerify();
        const userId = request.user.id;

        const chats = await prisma.chat.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            select: {
                id: true,
                title: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: { messages: true }
                }
            }
        });

        return reply.code(200).send(chats);
        
    } catch (error) {
        return reply.code(500).send({ error: "Erro no servidor" });
    }
};

export const createChat = async (
    request: FastifyRequest<{
        Body: { title?: string }
    }>,
    reply: FastifyReply
) => {
    try {
        await request.jwtVerify();
        const userId = request.user.id;

        // Conta quantos chats o usuário já tem para nomear automaticamente
        const chatCount = await prisma.chat.count({
            where: { userId }
        });

        const chat = await prisma.chat.create({
            data: {
                userId,
                title: request.body?.title || `Conversa ${chatCount + 1}`
            }
        });

        return reply.code(201).send(chat);
        
    } catch (error) {
        return reply.code(500).send({ error: "Erro no servidor" });
    }
};