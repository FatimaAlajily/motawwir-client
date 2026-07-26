import type { BasePost } from "../common/BasePost";

export type QuestionPost = BasePost & {
  type: "question";
  content: string;
};
