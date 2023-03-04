import useSWR from 'swr';

import { useTwitterRepository } from '@/repositories/twitter';
import { tweetCacheKeyGenerator, TweetCreateQuery } from '@/usecases/twitter';
import { TweetCreateResponse } from '@/usecases/twitter';

export const useTweetCreate = (query: TweetCreateQuery) => {
  const repository = useTwitterRepository();

  return useSWR<TweetCreateResponse>(
    tweetCacheKeyGenerator.generateCreateKey(query),
    () => repository.createTweet(query),
    {
      revalidateOnFocus: false,
    }
  );
};
