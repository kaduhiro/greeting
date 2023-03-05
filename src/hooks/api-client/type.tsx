import { ResponseAssistantData, ResponseTweetData } from '@/generated/type';
import { ConversationCreateQuery } from '@/usecases/assistant';
import { TweetCreateQuery } from '@/usecases/twitter';

export type TwitterApiClient = {
  postTweet: (query: TweetCreateQuery) => Promise<ResponseTweetData>;
};

export type AssistantApiClient = {
  postConversation: (query: ConversationCreateQuery) => Promise<ResponseAssistantData>;
};
