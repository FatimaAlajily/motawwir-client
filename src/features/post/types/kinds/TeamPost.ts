import type { BasePost } from "../common/BasePost";

export type TeamPost = BasePost & {
  type: "team";
  content: string;
  skill: string[];
  primary_link: string;
};
