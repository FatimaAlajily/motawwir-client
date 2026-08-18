import { create } from "zustand";

type UserSearchStore = {
  query: string;
  setQuery: (query: string) => void;
};

export const useUserSearchStore = create<UserSearchStore>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));