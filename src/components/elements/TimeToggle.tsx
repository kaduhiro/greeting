import { useEffect, useState } from 'react';

import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState } from 'recoil';

import { timeState } from '@/states';

export const TimeToggle = () => {
  const [time, setTime] = useRecoilState(timeState);

  const adjust = () => {
    setTime({ ...time, morning: new Date().getHours() < 12 });
  };

  const [iconClasses, setIconClasses] = useState<string[]>([]);

  useEffect(() => {
    setIconClasses([time.morning ? 'text-orange-500' : '', !time.morning ? 'text-yellow-500' : '']);
  }, [time.morning]);

  useEffect(() => {
    adjust();

    window.addEventListener('focus', adjust);

    return () => {
      window.removeEventListener('focus', adjust);
    };
  }, []);

  return (
    <div className='flex gap-4'>
      <FontAwesomeIcon icon={faSun} className={`h-6 ${iconClasses[0]}`} />
      <label className='relative inline-flex cursor-pointer items-center'>
        <input
          type='checkbox'
          value=''
          className='peer sr-only'
          checked={!time.morning}
          onChange={() => setTime({ ...time, morning: !time.morning })}
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
      </label>
      <FontAwesomeIcon icon={faMoon} className={`h-6 ${iconClasses[1]}`} />
    </div>
  );
};
