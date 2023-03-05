import { Tweet } from '@/entities/twitter';

export const linkToTweet = (tweet: Tweet) => {
  return `https://twitter.com/${tweet.username}/status/${tweet.id}`;
};
