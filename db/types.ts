import { InferModel } from "drizzle-orm";
import { Comment, Pushdevices, Question, QuestionComments, QuestionLikes, QuestionVotes } from "./migrations/schema";

export type Comment = InferModel<typeof Comment>;
export type Question = InferModel<typeof Question>;
export type QuestionLikes = InferModel<typeof QuestionLikes>;
export type QuestionVotes = InferModel<typeof QuestionVotes>;
export type Pushdevices = InferModel<typeof Pushdevices>;
export type QuestionComments = InferModel<typeof QuestionComments>;

export interface QuestionWithVotes extends Question { votes: QuestionVotes[] }
export interface QuestionWithLikes extends Question { likes: QuestionLikes[] }
export interface QuestionWithVotesAndLikes extends Question { votes: QuestionVotes[], likes: QuestionLikes[] }

export interface LikeProps {
  userId: string;
  question: number;
}

export interface VoteProps extends LikeProps {
  option: number;
}
