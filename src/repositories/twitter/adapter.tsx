import { Tweet } from '@/entities/twitter';
import { ResponseTweetData } from '@/generated/type';

export const adaptTweetFromData = (data: ResponseTweetData): Tweet => {
  return {
    id: data.id,
    title: data.title,
    body: data.body,
  };
};
