import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// State to manage items
export const itemsState = atom({
  key: 'itemsState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// State to manage snackbar notifications
export const snackbarState = atom({
  key: 'snackbarState',
  default: {
    open: false,
    message: '',
    severity: 'success', // Options: "success", "warning", "error", "info"
  },
});
