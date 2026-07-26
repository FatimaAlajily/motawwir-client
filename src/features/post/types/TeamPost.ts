import type { BasePost } from "./BasePost";

export type TeamPost = BasePost & {
  type: "team";
  content: string;
  skill: string[];
  primary_link: string;
};
