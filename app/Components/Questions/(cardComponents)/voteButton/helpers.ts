"use client";

import { QuestionVotes, QuestionWithVotes } from "@/db/types";
import { voteNumber } from "../voteButton/voteButton";

export async function getVoteCount(
  question: QuestionWithVotes,
  voteNumber: number
): Promise<number> {
  const ret: String[] = [];
  question.votes.map((ev: QuestionVotes) => {
    if (ev.option === voteNumber) ret.push(ev.ownerId);
  });
  return ret.length;
}

export async function getAsyncVouteCount(question: QuestionWithVotes, index: voteNumber): Promise<number>{
  const res = await fetch(`/api/questionVotes?id=${question.id}&option=${index}`);
  const data = await res.json()
  return await data.data
}
