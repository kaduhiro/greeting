import { useRef } from 'react';

export const Form = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full p-2'>
          <input
            type='text'
            className='w-full rounded border border-gray-300 bg-gray-100/20 py-3 px-4 text-base leading-8 text-gray-900 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 dark:text-gray-100 dark:focus:text-gray-700'
            ref={titleRef}
          />
        </div>
        <div className='w-full p-2'>
          <textarea
            className='h-40 w-full resize-none overflow-hidden rounded border border-gray-300 bg-gray-100/20 py-3 px-4 text-base leading-6 text-gray-900 outline-none transition duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 disabled:opacity-50 dark:text-gray-100 dark:focus:text-gray-700'
            maxLength={140}
            ref={bodyRef}
          ></textarea>
        </div>
        <div className='flex w-full justify-end p-2'>
          <button className='flex h-10 items-center rounded border-0 bg-blue-500 py-2 px-8 text-lg capitalize text-white duration-200 hover:bg-blue-600 focus:outline-none'>
            greeting
          </button>
        </div>
      </div>
    </>
  );
};
