"use client";
import { Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { EditableVoteButton } from "./voteButtonEditable";
import { FullscreenImageModal, VoteImage } from "./voteButtonComponents";
import { useUser } from "@clerk/nextjs";
import { Option, QuestionVotes, QuestionWithVotesAndLikes } from "@/db/types";
import { displayMessage, noLogin } from "../../helpers";
import { useRouter } from "next/navigation";

interface IButtonProps {
  setOption1: (values: string) => void;
  setOption2: (values: string) => void;
  setOption3: (values: string) => void;
  setOption4: (values: string) => void;
  isOpen: boolean;
  question: QuestionWithVotesAndLikes;
}

interface IStackProps {
  isOpen: boolean;
  question: QuestionWithVotesAndLikes;
  image: string;
  option: Option;
  voted: number;
  selectedOption: number;
  votes: QuestionVotes[];
  setVoted: (vote: number)=>void;
  setImageModal: (image: string) => void;
}

function ButtonWithImage(props: IStackProps) {
  const { question, isOpen, image,votes, option, setImageModal, voted, setVoted } = props;
  const { user, isSignedIn } = useUser();
  const [voteCount, setVoteCount] = useState<number>(0)
  const router = useRouter()

  function countVotes() {
    let res: number[] = []
    votes.map((vote)=>{
      if(vote.option === option.id) res.push(1)
    })
    setVoteCount(res.length)
  }

  useEffect(()=>{
    countVotes()
  }, [question, option])

  async function handleVote() {
    if (!isSignedIn) return noLogin(router);
    setVoted(voted == option.id ? 0 : option.id)

    await fetch("/api/votes", {
      method: "POST",
      body: JSON.stringify({
        option: option.id,
        userId: user.id,
        question: question.id,
      }),
    }).then(async (res: any) => {
      displayMessage(await res.json(), router);
      countVotes()
    });
  }

  return (
    <Stack>
      {!isOpen && image !== "" && (
        <VoteImage
          altText="First option Image"
          image={image}
          setModal={() => setImageModal(image)}
        />
      )}
      <EditableVoteButton
        voted={voted == option.id}
        voteCount={voteCount}
        isOpen={isOpen}
        option={option}
        votes={votes}
        handleVote={()=>handleVote()}
      />
    </Stack>
  );
}

export default function VoteButton(ButtonProps: IButtonProps) {
  const [imageModal, setImageModal] = useState<string | null>(null);
  const [_voteStatus, setVoteStatus] = useState<number>(0);
  const { isSignedIn, user } = useUser();
  const { question, isOpen } = ButtonProps;
  const [voted, setVoted] = useState<number>(0);

  function validateVotes() {
    if (!isSignedIn || !question) return;
    if (question.votes.length <= 0) setVoteStatus(0);
    question.votes.map((vote: QuestionVotes) => {
      if (vote.ownerId === user.id) {
        setVoteStatus(vote.option);
      }
    });
  }

  async function getStatus() {
    if (!user) return;
    const res = await fetch(`/api/votes?id=${question.id}&user=${user.id}`, {
      method: "GET",
      cache: "no-store",
    });
    const returnValue = await res.json();
    if(returnValue.voted[0]) setVoted(returnValue.voted[0].option ?? 0);
  }

  useEffect(() => {
    getStatus();
    validateVotes();
  }, [isSignedIn, user]);

  return (
    <>
      {/* TODO: Make both Images be displayed in a carousel */}
      <FullscreenImageModal
        imageModal={imageModal}
        setModal={() => setImageModal(null)}
      />
      {question ? (
        <Stack spacing="sm">
          {question.option.map((opt, index) => {
            return (
              <ButtonWithImage
                key={`${opt.name}${index}`}
                setImageModal={(image: string) => setImageModal(image)}
                isOpen={isOpen}
                question={question}
                image={opt.image ?? ""}
                selectedOption={voted}
                voted={voted}
                option={opt}
                votes={question.votes}
                setVoted={(vote: number)=>setVoted(vote)}
              />
            );
          })}
        </Stack>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
