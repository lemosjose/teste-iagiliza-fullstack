import type { ErrorReply } from "./auth.types.js";

export interface MessageBody { 
    content: string; 
}

export interface MessageReply { 
    content: string 
    reply: string
}

//generic interface to keep server.post strongly-tiped
export interface MessageRoute { 
    Body: MessageBody; 
    Reply: MessageReply | ErrorReply;
}