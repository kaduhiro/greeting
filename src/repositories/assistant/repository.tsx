import { useMemo } from 'react';

import { AssistantApiClient, useAssistantApiClient } from '@/hooks/api-client';
import { adaptConversationFromData } from '@/repositories/assistant';
import { ConversationCreateQuery } from '@/usecases/assistant';

export const useAssistantRepository = () => {
  const apiClient = useAssistantApiClient();

  return useMemo(() => createAssistantRepository(apiClient), [apiClient]);
};

const createAssistantRepository = (apiClient: AssistantApiClient) => ({
  async post(query: ConversationCreateQuery) {
    const data = await apiClient.postConversation(query);

    return {
      message: adaptConversationFromData(data),
    };
  },
});
