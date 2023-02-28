import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export const Footer = () => {
  return (
    <>
      <div className='mt-8 w-full border-t border-gray-200 p-2 pt-8 text-center'>
        created by
        <Link className='ml-1 text-blue-500' href='https://twitter.com/kaduhiro_' target='_blank'>
          kaduhiro
        </Link>
        <p className='my-5 leading-normal'>License: MIT</p>
        <span className='inline-flex'>
          <Link href='https://github.com/kaduhiro/greeting' target='_blank'>
            <FontAwesomeIcon
              className='h-8 text-gray-400 transition duration-200 hover:text-gray-500 dark:text-gray-700 dark:hover:text-gray-500'
              icon={faGithub}
            />
          </Link>
        </span>
      </div>
    </>
  );
};
