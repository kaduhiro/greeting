import { ResponseTweetData } from '@/generated/type';
import { TweetCreateQuery } from '@/usecases/twitter';

export const useTwitterApiClient = () => {
  const postTweet = async (query: TweetCreateQuery): Promise<ResponseTweetData> => {
    if (!query.title) {
      throw new Error('Title is empty.');
    }

    const result = await fetch('/api/twitter/tweet', {
      headers: {
        Accept: 'application/json, */*',
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(query),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .catch((error) => {
        throw new Error(error);
      });

    return result;
  };

  return { postTweet };
};
