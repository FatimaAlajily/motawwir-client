import type { BasePost } from "../common/BasePost";
import type { WorkDetails } from "./WorkDetails";

export type WorkPost = BasePost & {
  type: "work";
  content: string;
  skill: string[];
  work: WorkDetails;
};
