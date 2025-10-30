import { fastify } from 'fastify';
import cors from "@fastify/cors";
import fastifyJwt from '@fastify/jwt';
import fastifyEnv from "@fastify/env";

import { getMyUser, registerUser, updateMyName, updateMyEmail } from './controllers/userController.js';
import { authenticate, loginUser } from './controllers/authController.js';
import { getMessages, sendMessage } from './controllers/messageController.js';


import type { MessageRoute } from './types/message.types.js';

import answerUser from './services/aigen.js';

const server = fastify({
  logger: true
}); 



await server.register(fastifyEnv, {
  dotenv: true,
  schema: {
    type: 'object',
    required: ['JWT_SECRET'],
    properties: {
      JWT_SECRET: {
        type: 'string'
      },

      GEMINI_API_KEY: {
        type: 'string'
      }
    }
  }
});

//jwt_secret cannot be other thing than a string, type assertion
const JWT_SECRET: string = process.env.JWT_SECRET!;


await server.register(cors, {
  origin: ["*"], 
  //sincei it's still in development, some methods can lay around here for now while testing
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'UPDATE'],
  credentials: true, 
  allowedHeaders: [ 'Content-Type', 'Authorization', 'Cache-Control']
}
);

await server.register(fastifyJwt, { 
  secret: JWT_SECRET
});


// i am using a firewall so i mapped to the same port that was open to fastapi, but this is not a breaking change to make
const start = async () => {
  try{ 
    await server.listen({ port : 8080, host: "0.0.0.0"});
    console.log("Server is up") 
  }catch (error){
    throw Error
  }
};

server.get("/", async () => {
  return { ping: "pong"}
})

server.get("/testJwt", { preHandler: [ authenticate ]}, async (request,reply) => {
  return reply.send(({ ping: "pong" }))
})

//user

server.post("/register", registerUser);

server.post("/login", loginUser);

server.get("/me", { preHandler: [authenticate]} ,getMyUser);

server.patch("/me/updateName", { preHandler: [authenticate]}, updateMyName);

server.patch("/me/updateEmail", { preHandler: [authenticate]}, updateMyEmail);

server.post<MessageRoute>("/message", { preHandler: [authenticate]}, sendMessage);

server.get("/messages", {preHandler: [authenticate]}, getMessages);

start()