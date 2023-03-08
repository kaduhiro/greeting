import { useEffect, useRef, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { Assistant, Greeting, TimeToggle } from '@/components/elements';
import { Auth } from '@/components/parts';
import { assistantState, timeState } from '@/states';
import { TweetCreateQuery } from '@/usecases/twitter';

export const Form = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const time = useRecoilValue(timeState);
  const assistant = useRecoilValue(assistantState);

  const [greetingQuery, setGreetingQuery] = useState<TweetCreateQuery>({ title: '', body: '' });

  const updateForm = () => {
    const query = {
      title: titleRef.current?.value ?? '',
      body: bodyRef.current?.value ?? '',
    };

    if (!query.title) {
      query.title = time.morning ? time.morning_greeting : time.night_greeting;
    }

    setGreetingQuery(query);
  };

  useEffect(() => {
    if (titleRef.current && !greetingQuery.title.length) {
      titleRef.current.value = '';
    }

    if (bodyRef.current && !greetingQuery.body.length) {
      bodyRef.current.value = '';
    }
  }, [greetingQuery]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.placeholder = time.morning ? time.morning_greeting : time.night_greeting;
    }
  }, [time]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.value = assistant.data?.message.text ?? '';
      updateForm();
    }
  }, [assistant]);

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-2/3 p-2'>
          <input
            type='text'
            className='w-full rounded border border-gray-300 bg-gray-100/20 py-3 px-4 text-base leading-8 text-gray-900 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 dark:text-gray-100 dark:focus:text-gray-700'
            placeholder='title'
            ref={titleRef}
            onChange={updateForm}
          />
        </div>
        <div className='flex w-1/3 items-center justify-center p-2'>
          <TimeToggle />
        </div>
        <div className='w-full p-2'>
          <div className='relative'>
            <textarea
              className='h-40 w-full resize-none overflow-hidden rounded border border-gray-300 bg-gray-100/20 py-3 px-4 text-base leading-6 text-gray-900 outline-none transition duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 disabled:opacity-50 dark:text-gray-100 dark:focus:text-gray-700'
              maxLength={140}
              placeholder='body'
              ref={bodyRef}
              onChange={updateForm}
            ></textarea>
            <div className='absolute left-0 bottom-4'>
              <Assistant />
            </div>
            <span className='absolute right-4 bottom-4 text-gray-500'>{bodyRef.current?.value.length}</span>
          </div>
        </div>
        <div className='flex w-full justify-between p-2'>
          <Auth />
          <Greeting query={greetingQuery} setQuery={setGreetingQuery} />
        </div>
      </div>
    </>
  );
};
