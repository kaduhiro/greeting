import { ASSISTANT, REQUEST_TYPE } from '@/constants';

import { ConversationCreateQuery } from './type';

export const assistantCacheKeyGenerator = {
  generateCreateKey: ({ prompt }: ConversationCreateQuery) => {
    if (!prompt) {
      return null;
    }

    return [ASSISTANT.cacheKey.assistant, REQUEST_TYPE.create, prompt];
  },
};
