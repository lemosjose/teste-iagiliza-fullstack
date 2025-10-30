import { z } from "zod"

//there are few schemas, but i'm supposing a project that would need to grow over time with more and more schemas being added

export const userSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8),
})

export const loginSchema = z.object({ 
    email: z.email(),
    password: z.string().min(8), 
})

export const messageSchema = z.object({})