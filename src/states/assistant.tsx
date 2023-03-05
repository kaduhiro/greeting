import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { SWRResponse } from 'swr';

import { ConversationCreateResponse } from '@/usecases/assistant';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window === 'undefined' ? undefined : sessionStorage,
});

export type assistantStateType = SWRResponse<ConversationCreateResponse>;

export const assistantState = atom<assistantStateType>({
  key: 'assistant',
  default: {} as assistantStateType,
});
