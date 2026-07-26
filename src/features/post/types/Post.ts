import type { NewPost } from "./NewPost";
import type { ProjectPost } from "./ProjectPost";
import type { QuestionPost } from "./QuestionPost";
import type { TeamPost } from "./TeamPost";
import type { WorkPost } from "./WorkPost";

export type Post = QuestionPost | WorkPost | NewPost | ProjectPost | TeamPost;
