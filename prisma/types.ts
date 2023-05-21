import { Prisma } from "@prisma/client";

const questionWithVotes = Prisma.validator<Prisma.questionArgs>()({
  include: {
    votes: true,
  },
});

const questionWithLikes = Prisma.validator<Prisma.questionArgs>()({
  include: {
    likes: true,
  },
});

const questionWithVotesAndLikes = Prisma.validator<Prisma.questionArgs>()({
  include: {
    likes: true,
    votes: true,
  },
});

export type IQuestionWithVotes = Prisma.questionGetPayload<
  typeof questionWithVotes
>;

export type IQuestionWithLikes = Prisma.questionGetPayload<
  typeof questionWithLikes
>;

export type IQuestionWithVotesAndLikes = Prisma.questionGetPayload<
  typeof questionWithVotesAndLikes
>;
