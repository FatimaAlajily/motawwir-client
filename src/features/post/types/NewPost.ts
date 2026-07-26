import type { BasePost } from "./BasePost";

export type NewPost = BasePost & {
  type: "new";
  primary_link: string;
  file: string | null;
};
