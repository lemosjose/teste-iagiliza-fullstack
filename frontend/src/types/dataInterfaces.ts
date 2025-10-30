//same thing from the zod objects in backend/src/schemas/zod.ts, i'm supposing a further project wich would grow with more and more interfaces that need to be here

export interface userData { 
    name: string, 
    email: string, 
    password: string
};

export interface loginData { 
    email: string, 
    password: string
};