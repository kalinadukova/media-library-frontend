import { createPersistedStore } from "./createPersistedStore.ts";

import type { User, UserStore } from "../types/user.ts";

const initialUser: User = {
  id: "",
  email: "",
  token: "",
};

export const useUserStore = createPersistedStore<UserStore>(
  "user-storage",
  (set) => ({
    user: initialUser,
    updateUser: (newData: User) => set(() => ({ user: { ...newData } })),
    logoutUser: () => set(() => ({ user: initialUser })),
  }),
);
