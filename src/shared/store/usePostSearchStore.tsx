import { create } from "zustand";

type PostSearchState = {
  query: string;
  setQuery: (query: string) => void;
};

export const usePostSearchStore = create<PostSearchState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));
