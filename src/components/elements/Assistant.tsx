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
      prompt: `
# Order:
You are a professional Commentator.
Output the best summary based on the following Constraints and Input.

# Constraints:
- About 140 characters
- Easy to understand for elementary school students
- No important keywords are left out
- Output in Japanese

# Input:
Please introduce what day ${date} is by selecting one at random from the "Holidays and observances" section of Wikipedia.

# Output:
`,
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
