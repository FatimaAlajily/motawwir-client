import type { User } from "../user/User";

export type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};
