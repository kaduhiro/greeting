import { useEffect, useState } from 'react';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tweet } from '@/entities/twitter';
import { TweetCreateQuery, useTweetCreate } from '@/usecases/twitter';

type GreetingProps = {
  query: TweetCreateQuery;
};

export const Greeting = (props: GreetingProps) => {
  const [query, setQuery] = useState<TweetCreateQuery>({ title: '', body: '' });
  const [tweet, setTweet] = useState<Tweet>();
  const [errored, setErrored] = useState<boolean>(false);

  const response = useTweetCreate(query);
  useEffect(() => {
    if (response.data) {
      setTweet(response.data.tweet);
      setTimeout(() => setTweet(undefined), 3000);
    }
  }, [response.data]);

  useEffect(() => {
    if (response.error) {
      setErrored(true);
      setTimeout(() => setErrored(false), 3000);
    }
  }, [response.error]);

  const onGreeting = () => {
    setQuery(props.query);
  };

  const buttonClass =
    'flex items-center h-10 rounded border-0 py-2 px-8 text-lg duration-200 text-white capitalize focus:outline-none';

  if (!props.query.body.length) {
    return (
      <button className={`${buttonClass} bg-gray-500`} disabled={true}>
        ...
      </button>
    );
  }

  if (response.isLoading) {
    return (
      <button className={`${buttonClass} bg-gray-500`} disabled={true}>
        <div className='flex justify-center'>
          <div className='h-5 w-5 animate-spin rounded-full border-4 border-gray-300 border-t-transparent text-white'></div>
        </div>
      </button>
    );
  }

  if (errored) {
    return (
      <button className={`${buttonClass} bg-red-500`} disabled={true}>
        {response.error.message}
      </button>
    );
  }

  if (tweet) {
    return (
      <button className={`${buttonClass} bg-green-500`}>
        <FontAwesomeIcon className='h-5 w-5' icon={faCheck} />
      </button>
    );
  }

  return (
    <button className={`${buttonClass} bg-blue-500 hover:bg-blue-600`} onClick={onGreeting}>
      greeting
    </button>
  );
};