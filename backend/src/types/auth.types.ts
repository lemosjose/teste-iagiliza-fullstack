import '@fastify/jwt'

export type LoginBody = { 
    email: string; 
    password: string;
}


export type ErrorReply = { error: string}
export type LoginReply = { token: string }


// so it nows what to search when looking for a user that sent a message
declare module '@fastify/jwt' { 
    interface FastifyJWT {
        user: { 
            id: string;
            name: string;
        }
    }
}