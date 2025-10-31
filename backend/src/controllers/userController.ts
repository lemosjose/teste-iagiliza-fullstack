import type { FastifyReply, FastifyRequest } from "fastify";
import type { RegisterBody, RegisterReply, UpdateNameRoute ,ErrorReply, UpdateEmailRoute} from "../types/user.types.js";
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

        if(isRegistered){ 
            return reply.code(409).send({
                error: "Email já cadastrado"
            })
        }

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

export const getMyUser = async(
    request: FastifyRequest, 
    reply: FastifyReply
) => {
    try{ 

        await request.jwtVerify()



        const userId = request.user.id; 

        const user = await prisma.user.findUnique({
            where: { id: userId}, 

            select: {
                name: true,
                email: true,
            }
        })

        if(!user){
            return reply.code(404).send({ error: "Usuario não existe"})
        }

        return reply.code(200).send(user)

    } catch (error) { 
        return reply.code(500).send({ error: "Não é possível acessar esse recurso"})
    }
}

export const updateMyName = async(
    request: FastifyRequest<UpdateNameRoute>, 
    reply: FastifyReply
)=> { 
    try{ 
        await request.jwtVerify(); 

        const { name } = request.body;

        const userId = request.user.id; 

        const user = await prisma.user.update({
            where: { id: userId},

            data: {
                name: name
            }
        })

        return reply.code(200).send("Usuário atualizado!")
    }catch (error){
        return reply.code(500).send("Não autorizado!");
    }
}

export const updateMyEmail= async(
    request: FastifyRequest<UpdateEmailRoute>, 
    reply: FastifyReply
)=> { 
    try{ 
        await request.jwtVerify(); 

        const { email } = request.body;

        const userId = request.user.id; 

        const user = await prisma.user.update({
            where: { id: userId},

            data: {
                email: email
            }
        })

        return reply.code(200).send("Email para o seu Usuário atualizado!")
    }catch (error){
        return reply.code(500);
    }
}

//DOING/TODO 
// /me request from the specs
// export const getAuthenticatedUser()
