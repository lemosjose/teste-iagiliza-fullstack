import type { RouteGenericInterface } from "fastify";

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface RegisterReply {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface ErrorReply {
  error: string;
  details?: string;
}

export interface nameUpdate {
  name: string;
}

export interface emailUpdate {
  email: string
}


// so i do not use type infer for the patch queries
export interface UpdateNameRoute extends RouteGenericInterface { 
  Body: {
    name: string;
  }
}

export interface UpdateEmailRoute extends RouteGenericInterface{ 
  Body: { 
    email: string;
  }
}