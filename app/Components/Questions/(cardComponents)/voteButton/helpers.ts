"use client";

import { Option, QuestionVotes, QuestionWithVotes, QuestionWithVotesAndLikes } from "@/db/types";

export async function getVoteCount(
  question: QuestionWithVotesAndLikes ,
  voteNumber: number
): Promise<number> {
  const ret: string[] = [];
  question.option.map((option: Option) => {
    if (option.id === voteNumber) ret.push(option.ownerId);
  });
  return ret.length;
}
