import useSWR from 'swr';

import { useAssistantRepository } from '@/repositories/assistant';
import { assistantCacheKeyGenerator } from '@/usecases/assistant/cache';

import { ConversationCreateQuery, ConversationCreateResponse } from './type';

export const useAssistantPost = (query: ConversationCreateQuery) => {
  const repository = useAssistantRepository();

  return useSWR<ConversationCreateResponse>(
    assistantCacheKeyGenerator.generateCreateKey(query),
    () => repository.post(query),
    {
      revalidateOnFocus: false,
    }
  );
};
