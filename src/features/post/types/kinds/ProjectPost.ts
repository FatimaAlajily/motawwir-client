import type { BasePost } from "../common/BasePost";

export type ProjectPost = BasePost & {
  type: "project";
  content: string;
  file: string | null;
  primary_link: string;
  secondary_link: string | null;
  skill: string[];
};
