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