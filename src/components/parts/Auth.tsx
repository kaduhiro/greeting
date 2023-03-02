import { faRightFromBracket, faRightToBracket, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

import { Img } from '@/components/elements';

type ButtonType = {
  className: string;
  text: string;
  icon: IconDefinition;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const Auth = () => {
  const { data: session } = useSession();

  const Button = ({ className, text, icon, onClick }: ButtonType) => {
    return (
      <button
        type='button'
        className={`flex items-center justify-center gap-2 rounded-lg py-2 px-4 text-center text-base font-semibold capitalize text-white shadow-md transition duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-200 ${className}`}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={icon} height={16} />
        {text}
      </button>
    );
  };

  return session ? (
    <div className='flex items-center gap-3'>
      <Link href={`https://twitter.com`} target='_blank'>
        <Img
          className='h-10 w-10 rounded-full border-2 border-transparent p-0.5 transition duration-200 hover:border-gray-200 hover:opacity-80'
          src={session.user?.image ?? ''}
          alt='icon'
        />
      </Link>
      <Link
        href={`https://twitter.com/${session.user?.username}`}
        target='_blank'
        className='pr-2 text-gray-500 hover:underline'
      >
        {session.user?.name}
      </Link>
      <Button
        className='bg-red-600 hover:bg-red-700 focus:ring-red-500'
        text='sign out'
        icon={faRightFromBracket}
        onClick={() => signOut()}
      />
    </div>
  ) : (
    <Button
      className='bg-green-600 hover:bg-green-700 focus:ring-green-500'
      text='sign in'
      icon={faRightToBracket}
      onClick={() => signIn('twitter')}
    />
  );
};
