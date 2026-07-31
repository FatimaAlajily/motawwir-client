import { create } from "zustand";
import type { AuthState } from "../types/state/AuthState";
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
