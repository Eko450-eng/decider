import { InferModel } from "drizzle-orm";
import { account, comment, pushdevices, question, questionComments, questionLikes, questionVotes } from "./migrations/schema";

export type Account = InferModel<typeof account>;
export type Comment = InferModel<typeof comment>;
export type Question = InferModel<typeof question>;
export type QuestionLikes = InferModel<typeof questionLikes>;
export type QuestionVotes = InferModel<typeof questionVotes>;
export type Pushdevices = InferModel<typeof pushdevices>;
export type QuestionComments = InferModel<typeof questionComments>;

export interface QuestionWithVotes extends Question { votes: QuestionVotes[] }
export interface QuestionWithLikes extends Question { likes: QuestionLikes[] }
export interface QuestionWithVotesAndLikes extends Question { votes: QuestionVotes[], likes: QuestionLikes }
// import { Prisma, question } from "@prisma/client";
//
// const questionWithVotes = Prisma.validator<Prisma.questionArgs>()({
//   include: {
//     votes: true,
//   },
// });
//
// const questionWithLikes = Prisma.validator<Prisma.questionArgs>()({
//   include: {
//     likes: true,
//   },
// });
//
// const questionWithVotesAndLikes = Prisma.validator<Prisma.questionArgs>()({
//   include: {
//     likes: true,
//     votes: true,
//   },
// });
//
// export type IQuestionWithVotes = Prisma.questionGetPayload<
//   typeof questionWithVotes
// >;
//
// export type IQuestionWithLikes = Prisma.questionGetPayload<
//   typeof questionWithLikes
// >;
//
// export type IQuestionWithVotesAndLikes = Prisma.questionGetPayload<
//   typeof questionWithVotesAndLikes
// >;
//
// export interface LikeProps {
//   userId: string;
//   question: number;
// }
//
// export interface VoteProps extends LikeProps {
//   option: number;
// }
//
// export interface EditProps {
//   question: question;
//   userid: string;
// }
//
