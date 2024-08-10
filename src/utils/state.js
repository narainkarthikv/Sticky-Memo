import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const itemsState = atom({
  key: 'itemsState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
