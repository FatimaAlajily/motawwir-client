import type { BasePost } from "../common/BasePost";

export type NewPost = BasePost & {
  type: "new";
  primary_link: string;
  file: string | null;
};
