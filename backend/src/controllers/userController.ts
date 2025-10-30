import type { FastifyReply, FastifyRequest } from "fastify";
import type { RegisterBody, RegisterReply, ErrorReply } from "../types/user.types.js";
import { z } from "zod"

import { prisma } from "../lib/prisma.js"

import { userSchema } from "../schemas/zod.js";

import bcrypt from "bcrypt";

//using the identation and style from fastify's typescript docs
// https://fastify.dev/docs/latest/Reference/TypeScript/
export const registerUser = async (
    request: FastifyRequest<{
        Body: RegisterBody;
        Reply: RegisterReply | ErrorReply;
    }> ,
    reply: FastifyReply
) => {
    try {

        const userData = userSchema.parse(request.body)

        const isRegistered = await prisma.user.findUnique({
            where: {email: userData.email}
        }); 

        //important note = bcrypt.hash() returns a Promise object for the hash operation and thus cannot be typed directly as a string 
        const cloak = await bcrypt.hash(userData.password, 10);

        // now this keeps a string
        const underCover: string = cloak;

        const user = await prisma.user.create({
            data: {
                name: userData.name, 
                email: userData.email,
                password: underCover
            }
        })



    }catch(error){
        if(error instanceof z.ZodError){
            return reply.code(400).send({
                error: " Zod: Dados inválidos, tente novamente", 
            });
        }

        return reply.code(500).send({
            error: "Erro no servidor!"
        })
    }
};

//DOING/TODO 
// /me request from the specs
// export const getAuthenticatedUser()
