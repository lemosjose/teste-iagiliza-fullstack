import type { FastifyRequest, FastifyReply } from "fastify";
import type { LoginBody, LoginReply, ErrorReply } from "../types/auth.types.js"

import { loginSchema } from "../schemas/zod.js";

import { prisma } from "../lib/prisma.js"

import bcrypt from "bcrypt";

import {z} from "zod"

//using the identation and style from fastify's typescript docs
// https://fastify.dev/docs/latest/Reference/TypeScript/
export const loginUser = async(
    request: FastifyRequest<{
        Body: LoginBody; 
        Reply: LoginReply | ErrorReply;
    }>, 
    reply: FastifyReply
) => { 
    try{ 
        const loginData = loginSchema.parse(request.body);

        const user = await prisma.user.findUnique({
            where: { email: loginData.email }
        });

        if(!user){
            return reply.code(401).send({ error: "Login Inválido!"})
        };

        const isPasswordRight = await bcrypt.compare(loginData.password, user.password); 

        if(!isPasswordRight){ 
            return reply.code(401).send({error: "Senha incorreta"});
        };

        const token = await request.server.jwt.sign(
            {
                id: user.id,
                name: user.name
            },

            {
                expiresIn: '3d'
            }
        )

        return reply.code(200).send({ token: token }); 


    }catch(error){
        if(error instanceof z.ZodError){ 
            return reply.code(400).send({
                error: "Zod: Dados inválidos"
            });
        }; 
        return reply.code(500).send({ error: "Erro no servidor!" });
    };
};

//gatekeeper 
export const authenticate = async ( 
    request: FastifyRequest,
    reply: FastifyReply
) => { 
    try { 
        await request.jwtVerify(); 
    } catch (error) { 
        return reply.code(401).send({ error: "Não autorizado, faça login" });
    }
};