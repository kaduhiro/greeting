import { useEffect, useState } from 'react';

import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { useSetRecoilState } from 'recoil';

import { assistantState } from '@/states';
import { ConversationCreateQuery, useAssistantPost } from '@/usecases/assistant';

export const Assistant = () => {
  const setAssistant = useSetRecoilState(assistantState);

  const [query, setQuery] = useState<ConversationCreateQuery>({ prompt: '' });

  const response = useAssistantPost(query);

  useEffect(() => {
    if (response.data) {
      setAssistant(response);
    }
  }, [response.data]);

  const onAssist = () => {
    const date = format(new Date(), 'MMMM d');

    setQuery({
      prompt: `please answer in about 100 characters in japanese. what trivia can you share about ${date} in japan?`,
    });
  };

  return (
    <button className='focus:outline-none rtl:left-0 rtl:right-auto' onClick={onAssist}>
      <FontAwesomeIcon
        icon={faRobot}
        className={
          'mx-4 h-6 w-6 transition-colors duration-300 ' +
          (response.isLoading
            ? 'text-blue-600 hover:text-blue-500 dark:text-blue-400 animate-heartbeat'
            : 'text-gray-600 hover:text-gray-500 dark:text-gray-400')
        }
      />
    </button>
  );
};
