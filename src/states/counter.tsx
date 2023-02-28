import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window === 'undefined' ? undefined : sessionStorage,
});

export type counterStateType = {
  count: number;
};

export const counterState = atom<counterStateType>({
  key: 'counter',
  default: {
    count: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
