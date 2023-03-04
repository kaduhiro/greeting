import { Tweet } from '@/entities/twitter';

export type TweetCreateQuery = {
  title: string;
  body: string;
};

export type TweetCreateResponse = { tweet: Tweet };
