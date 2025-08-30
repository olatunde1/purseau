import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const authStore = createStore(
  persist(
    (set) => ({
      accessToken: null,
      currentUser: null,
      currentAddress: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setCurrentUser: (user) => set({ currentUser: user }),
      setCurrentAddress: (address) => set({ currentAddress: address }),
      logout: () => set({ accessToken: null, currentUser: null , currentAddress: null }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useAuthStore = authStore.getState;
