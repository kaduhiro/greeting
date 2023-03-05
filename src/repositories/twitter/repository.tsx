import { useMemo } from 'react';

import { TwitterApiClient, useTwitterApiClient } from '@/hooks/api-client';
import { TweetCreateQuery } from '@/usecases/twitter';

import { adaptTweetFromData } from './adapter';

export const useTwitterRepository = () => {
  const apiClient = useTwitterApiClient();

  return useMemo(() => createTwitterRepository(apiClient), [apiClient]);
};

export const createTwitterRepository = (apiClient: TwitterApiClient) => ({
  async createTweet(query: TweetCreateQuery) {
    const data = await apiClient.postTweet(query);

    return {
      tweet: adaptTweetFromData(data),
    };
  },
});
