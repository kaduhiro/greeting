import { Message } from '@/entities/assistant';

export type ConversationCreateQuery = {
  prompt: string;
};

export type ConversationCreateResponse = { message: Message };
