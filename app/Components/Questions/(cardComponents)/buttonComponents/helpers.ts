"use client"

import { QuestionVotes, QuestionWithVotes } from "@/db/types"

  export function getVoteCount(question: QuestionWithVotes, voteNumber: number): number {
    const ret: String[] = [];
    question.votes.map((ev: QuestionVotes) => {
      if (ev.option === voteNumber) ret.push(ev.ownerId);
    });
    return ret.length;
  }
