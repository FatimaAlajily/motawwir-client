import type { NewPost } from "../kinds/NewPost";
import type { ProjectPost } from "../kinds/ProjectPost";
import type { QuestionPost } from "../kinds/QuestionPost";
import type { TeamPost } from "../kinds/TeamPost";
import type { WorkDetails } from "../kinds/WorkDetails";

import type { WorkPost } from "../kinds/WorkPost";

type QuestionCreateFields = Pick<QuestionPost, "title" | "content">;

type TeamCreateFields = Pick<
  TeamPost,
  "title" | "content" | "skill" | "primary_link"
>;

type ProjectCreateFields = Pick<
  ProjectPost,
  "title" | "content" | "skill" | "primary_link" | "secondary_link"
>;

type NewCreateFields = Pick<NewPost, "title" | "primary_link">;

type WorkCreateFields = Pick<WorkPost, "title" | "content" | "skill"> &
  WorkDetails;

// ---------- Payloads ----------

export type CreateQuestionPayload = QuestionCreateFields & { type: "question" };
export type CreateTeamPayload = TeamCreateFields & { type: "team" };
export type CreateWorkPayload = WorkCreateFields & { type: "work" };
export type CreateNewPayload = NewCreateFields & { type: "new"; file: File };
export type CreateProjectPayload = ProjectCreateFields & {
  type: "project";
  file: File;
};

export type CreatePostPayload =
  | CreateQuestionPayload
  | CreateTeamPayload
  | CreateWorkPayload
  | CreateNewPayload
  | CreateProjectPayload;

export type UpdatePostPayload = Partial<
  QuestionCreateFields &
    TeamCreateFields &
    Omit<WorkCreateFields, never> &
    NewCreateFields &
    ProjectCreateFields
> & {
  type?: "question" | "work" | "new" | "project" | "team";
  file?: File;
};
