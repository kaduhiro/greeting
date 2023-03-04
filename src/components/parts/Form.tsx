import { useRef, useState } from 'react';

import { Greeting } from '@/components/elements';
import { Auth } from '@/components/parts';
import { TweetCreateQuery } from '@/usecases/twitter';

export const Form = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const [tweetQuery, setTweetQuery] = useState<TweetCreateQuery>({ title: '', body: '' });

  const onChangeInput = () => {
    const query = {
      title: titleRef.current?.value ?? '',
      body: bodyRef.current?.value ?? '',
    };

    setTweetQuery(query);
  };

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full p-2'>
          <input
            type='text'
            className='w-full rounded border border-gray-300 bg-gray-100/20 py-3 px-4 text-base leading-8 text-gray-900 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 dark:text-gray-100 dark:focus:text-gray-700'
            placeholder='title'
            ref={titleRef}
            onChange={onChangeInput}
          />
        </div>
        <div className='w-full p-2'>
          <textarea
            className='h-40 w-full resize-none overflow-hidden rounded border border-gray-300 bg-gray-100/20 py-3 px-4 text-base leading-6 text-gray-900 outline-none transition duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 disabled:opacity-50 dark:text-gray-100 dark:focus:text-gray-700'
            maxLength={140}
            placeholder='body'
            ref={bodyRef}
            onChange={onChangeInput}
          ></textarea>
        </div>
        <div className='flex w-full justify-between p-2'>
          <Auth />
          <Greeting query={tweetQuery} />
        </div>
      </div>
    </>
  );
};
