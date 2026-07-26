import type { BasePost } from "./BasePost";

export type QuestionPost = BasePost & {
  type: "question";
  content: string;
};
