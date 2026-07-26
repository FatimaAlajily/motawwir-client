import type { BasePost } from "./BasePost";
import type { WorkDetails } from "./WorkDetails";

export type WorkPost = BasePost & {
  type: "work";
  content: string;
  skill: string[];
  work: WorkDetails;
};
