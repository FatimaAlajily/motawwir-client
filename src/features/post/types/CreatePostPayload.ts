import type { NewPost } from "./NewPost";
import type { WorkDetails } from "./WorkDetails";
import type { ProjectPost } from "./ProjectPost";
import type { QuestionPost } from "./QuestionPost";
import type { TeamPost } from "./TeamPost";
import type { WorkPost } from "./WorkPost";

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
