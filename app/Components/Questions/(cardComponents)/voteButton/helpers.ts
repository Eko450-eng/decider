"use client";

import {
  Option,
  QuestionVotes,
  QuestionWithVotes,
  QuestionWithVotesAndLikes,
} from "@/db/types";

export function getVoteCount(
  question: QuestionWithVotesAndLikes,
  optionName: string
): number {
  const ret: string[] = [];

  question.option.map((option: Option) => {
    if (option.name === optionName) ret.push(option.ownerId);
  });

  return ret.length;
}
