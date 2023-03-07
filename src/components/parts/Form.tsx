import { useEffect, useRef, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { Assistant, Greeting } from '@/components/elements';
import { Auth } from '@/components/parts';
import { assistantState, timeState } from '@/states';
import { TweetCreateQuery } from '@/usecases/twitter';

export const Form = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const time = useRecoilValue(timeState);
  const assistant = useRecoilValue(assistantState);

  const [tweetQuery, setTweetQuery] = useState<TweetCreateQuery>({ title: '', body: '' });

  const updatePrompt = () => {
    const query = {
      title: titleRef.current?.value ?? '',
      body: bodyRef.current?.value ?? '',
    };

    if (!query.title) {
      query.title = time.morning ? time.morning_greeting : time.night_greeting;
    }

    setTweetQuery(query);
  };

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.placeholder = time.morning ? time.morning_greeting : time.night_greeting;
    }
  }, [time]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.value = assistant.data?.message.text ?? '';
      updatePrompt();
    }
  }, [assistant]);

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full p-2'>
          <input
            type='text'
            className='w-full rounded border border-gray-300 bg-gray-100/20 py-3 px-4 text-base leading-8 text-gray-900 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 dark:text-gray-100 dark:focus:text-gray-700'
            placeholder='title'
            ref={titleRef}
            onChange={updatePrompt}
          />
        </div>
        <div className='w-full p-2'>
          <div className='relative'>
            <textarea
              className='h-40 w-full resize-none overflow-hidden rounded border border-gray-300 bg-gray-100/20 py-3 px-4 text-base leading-6 text-gray-900 outline-none transition duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 disabled:opacity-50 dark:text-gray-100 dark:focus:text-gray-700'
              maxLength={140}
              placeholder='body'
              ref={bodyRef}
              onChange={updatePrompt}
            ></textarea>
            <div className='absolute left-0 bottom-4'>
              <Assistant />
            </div>
            <span className='absolute right-4 bottom-4 text-gray-500'>{bodyRef.current?.value.length}</span>
          </div>
        </div>
        <div className='flex w-full justify-between p-2'>
          <Auth />
          <Greeting query={tweetQuery} />
        </div>
      </div>
    </>
  );
};
