import type { Role } from "../../../auth/types/user/Role";

export type ProfileUser = {
  id: number;
  user_name: string;
  role: Role;
  avatar: string | null;
  votra?: number;
};

export type Profile = {
  id?: number;
  bio: string | null;
  phone: string | null;
  location: string | null;
  skill: string[] | null;
  github: string | null;
  gmail: string | null;
  domain: string | null;
  cv: string | null;
  linkedin: string | null;
  user?: ProfileUser;
  created_at?: string;
  updated_at?: string;
};

export type UpdateProfilePayload = {
  user_name?: string;
  avatar?: File | null;
  bio?: string;
  phone?: string;
  location?: string;
  skill?: string[];
  github?: string;
  gmail?: string;
  domain?: string;
  cv?: File | null;
  linkedin?: string;
};

export type ProfileResponse = {
  status: "success" | "error";
  message: string;
  data?: Profile;
};