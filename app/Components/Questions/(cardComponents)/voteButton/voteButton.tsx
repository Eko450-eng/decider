"use client";
import { Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { EditableVoteButton } from "./voteButtonEditable";
import { FullscreenImageModal, VoteImage } from "./voteButtonComponents";
import { useUser } from "@clerk/nextjs";
import { QuestionVotes, QuestionWithVotes } from "@/db/types";

export type voteNumber = 0 | 1 | 2 | 3 | 4
interface IButtonProps {
  setOption1: (values: string) => void;
  setOption2: (values: string) => void;
  setOption3: (values: string) => void;
  setOption4: (values: string) => void;
  isOpen: boolean;
  imageByte1: string;
  imageByte2: string;
  imageByte3: string;
  imageByte4: string;
  question: QuestionWithVotes;
}


export default function VoteButton(ButtonProps: IButtonProps) {
  const [imageModal, setImageModal] = useState<string | null>(null);
  const [voteStatus, setVoteStatus] = useState<voteNumber>(0);
  const { isSignedIn, user } = useUser();
  const { question, imageByte1, imageByte2, imageByte3, imageByte4, isOpen, setOption1, setOption2, setOption3, setOption4 } =
    ButtonProps;

  function validateVotes() {
    if (!isSignedIn || !question) return;
    if (question.votes.length <= 0) setVoteStatus(0);
    question.votes.map((vote: QuestionVotes) => {
      if (vote.ownerId === user.id) {
        setVoteStatus(vote.option as voteNumber);
      }
    });
  }

  useEffect(() => {
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
          <Stack>
            {!isOpen && imageByte1 !== "" && (
              <VoteImage
                altText="First option Image"
                image={imageByte1}
                setModal={() => setImageModal(imageByte1)}
              />
            )}
            <EditableVoteButton
              setVoteStatus={(index) => setVoteStatus(index)}
              setValue={setOption1}
              isOpen={isOpen}
              question={question}
              option={question.option1}
              index={1}
              voteStatus={voteStatus}
            />
          </Stack>
          <Stack>
            {!isOpen && imageByte2 !== "" && (
              <VoteImage
                altText="Second option Image"
                image={imageByte2}
                setModal={() => setImageModal(imageByte2)}
              />
            )}
            <EditableVoteButton
              setVoteStatus={(index) => setVoteStatus(index)}
              setValue={setOption2}
              isOpen={isOpen}
              question={question}
              option={question.option2}
              index={2}
              voteStatus={voteStatus}
            />
          </Stack>
          {question.option3 && (
            <>
              <Stack>
                {!isOpen && imageByte3 !== "" && (
                  <VoteImage
                    altText="Third option Image"
                    image={imageByte3}
                    setModal={() => setImageModal(imageByte2)}
                  />
                )}
                <EditableVoteButton
                  setVoteStatus={(index) => setVoteStatus(index)}
                  setValue={setOption3}
                  isOpen={isOpen}
                  question={question}
                  option={question.option3}
                  index={3}
                  voteStatus={voteStatus}
                />
              </Stack>
            </>
          )}
          {question.option4 && (
            <>
              <Stack>
                {!isOpen && imageByte4 !== "" && (
                  <VoteImage
                    altText="Second option Image"
                    image={imageByte4}
                    setModal={() => setImageModal(imageByte4)}
                  />
                )}
                <EditableVoteButton
                  setVoteStatus={(index: voteNumber) => setVoteStatus(index)}
                  setValue={setOption4}
                  isOpen={isOpen}
                  question={question}
                  option={question.option4}
                  index={4}
                  voteStatus={voteStatus}
                />
              </Stack>
            </>
          )}
        </Stack>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
