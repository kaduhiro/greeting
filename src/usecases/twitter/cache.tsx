import { REQUEST_TYPE, TWITTER } from '@/constants';
import { TweetCreateQuery } from '@/usecases/twitter';

export const tweetCacheKeyGenerator = {
  generateCreateKey: ({ title, body }: TweetCreateQuery) => {
    if (!title) {
      return null;
    }

    return [TWITTER.cacheKey.tweet, REQUEST_TYPE.create, title, body] as const;
  },
};
