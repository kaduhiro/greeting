import { ResponseTweetData } from '@/generated/type';
import { TweetCreateQuery } from '@/usecases/twitter';

export type TweetApiClient = {
  postTweet: (query: TweetCreateQuery) => Promise<ResponseTweetData>;
};
