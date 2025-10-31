//same thing from the zod objects in backend/src/schemas/zod.ts, i'm supposing a further project wich would grow with more and more interfaces that need to be here

import type { MessageCard } from "./componentInterfaces";

export interface userData { 
    name: string;
    email: string;
    password: string;
};

export interface loginData { 
    email: string;  
    password: string; 
};

export interface userProfile { 
    name: string;
    email: string;
}

export interface messageData { 
    content: string
    chatId: string | null
}

export interface updateUserName { 
    name: string, 
}

export interface updateUserEmail { 
    email: string,
}

export interface ChatInfo {
  id: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    messages: number;
  };
}

export interface GetMessagesResponse { 
    chat: ChatInfo; 
    messages: MessageCard[];
}

export interface PostMessageResponse { 
    aiContent: string; 
    chatId: string | null
}

export interface Chat { 
    id: string;
    title: string | null;
    createdAt: string;
    updatedAt: string;
    userId: string;
}
