"use client"

import { IQuestionWithVotes } from "@/prisma/types";

  export function getVotes(question: IQuestionWithVotes, voteNumber: number): number {
    const ret: String[] = [];
    question.votes.map((ev) => {
      if (ev.option === voteNumber) ret.push(ev.ownerId);
    });
    return ret.length;
  }
