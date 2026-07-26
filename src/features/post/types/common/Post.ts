import type { NewPost } from "../kinds/NewPost";
import type { ProjectPost } from "../kinds/ProjectPost";
import type { QuestionPost } from "../kinds/QuestionPost";
import type { TeamPost } from "../kinds/TeamPost";
import type { WorkPost } from "../kinds/WorkPost";

export type Post = QuestionPost | WorkPost | NewPost | ProjectPost | TeamPost;
