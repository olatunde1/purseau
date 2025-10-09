import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const adminAuthStore = createStore(
  persist(
    (set) => ({
      accessToken: null,
      currentUser: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () =>
        set({ accessToken: null, currentUser: null }),
    }),
    {
      name: "adminAuth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useAdminAuthStore = adminAuthStore.getState;
