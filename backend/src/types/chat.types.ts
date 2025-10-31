import type { ErrorReply } from "./auth.types.js";

export interface Chat {
    id: string;
    title: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export interface createChatRoute { 
    Body: {
        title?: string; 
    }
    Reply: Chat | ErrorReply;
}