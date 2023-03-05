import { Message } from '@/entities/assistant';
import { ResponseAssistantData } from '@/generated/type';

export const adaptConversationFromData = (data: ResponseAssistantData): Message => {
  return {
    text: data.text.trim(),
    createdAt: new Date(),
  };
};
