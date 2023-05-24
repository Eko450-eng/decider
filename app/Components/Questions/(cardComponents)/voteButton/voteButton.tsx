"use client";
import { Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { EditableVoteButton } from "../buttonComponents/editableButton";
import { FullscreenImageModal, VoteImage } from "./voteButtonComponents";
import { useUser } from "@clerk/nextjs";
import { QuestionVotes, QuestionWithVotes } from "@/db/types";

interface IButtonProps {
  setOption1: (values: string) => void;
  setOption2: (values: string) => void;
  isOpen: boolean;
  imageByte1: string;
  imageByte2: string;
  question: QuestionWithVotes;
}

export default function VoteButton(ButtonProps: IButtonProps) {
  const [imageModal, setImageModal] = useState<string | null>(null);
  const [voteStatus, setVoteStatus] = useState(0);
  const { isSignedIn, user } = useUser();
  const { question, imageByte2, imageByte1, isOpen, setOption1, setOption2 } =
    ButtonProps;

  function validateVotes() {
    if (!isSignedIn || !question) return;
    question.votes.map((vote: QuestionVotes) => {
      if (vote.ownerId === user.id) {
        setVoteStatus(vote.option);
      }
    });
    if (question.votes.length <= 0) setVoteStatus(0);
  }

  useEffect(() => {
    validateVotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, user]);

  return (
    <>
      {/* TODO: Make both Images be displayed in a carousel */}
      {/* TODO: Image sizing */}
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
              revalidate={() => validateVotes()}
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
              revalidate={() => validateVotes()}
            />
          </Stack>
        </Stack>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
