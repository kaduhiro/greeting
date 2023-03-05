import { Tweet } from '@/entities/twitter';
import { ResponseTweetData } from '@/generated/type';

export const adaptTweetFromData = (data: ResponseTweetData): Tweet => {
  return {
    id: data.id,
    username: data.user.screen_name,
    status: data.text,
  };
};
