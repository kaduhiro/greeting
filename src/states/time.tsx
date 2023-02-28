import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window === 'undefined' ? undefined : sessionStorage,
});

export type timeStateType = {
  morning: boolean;
  morning_greeting: string;
  night_greeting: string;
};

export const timeState = atom<timeStateType>({
  key: 'time',
  default: {
    morning: true,
    morning_greeting: 'Good morning👋',
    night_greeting: 'Good night👋',
  },
  effects_UNSTABLE: [persistAtom],
});
