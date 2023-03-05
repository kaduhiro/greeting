import { ResponseAssistantData } from '@/generated/type';
import { ConversationCreateQuery } from '@/usecases/assistant';

export const useAssistantApiClient = () => {
  const postConversation = async (query: ConversationCreateQuery): Promise<ResponseAssistantData> => {
    if (!query.prompt) {
      throw new Error('Prompt is empty.');
    }

    const result = await fetch('/api/openai/gpt-3/conversation', {
      headers: {
        Accept: 'application/json, */*',
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(query),
    }).then((res) => res.json());

    return {
      text: result.text,
    };
  };

  return { postConversation };
};
