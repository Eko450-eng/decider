"use client";
import { Question } from "@/db/schema/schema";
import { Stack } from "@mantine/core";
import { useState } from "react";
import { EditableVoteButton } from "../buttonComponents/editableButton";
import { FullscreenImageModal, VoteImage } from "./voteButtonComponents";

interface IButtonProps {
  setOption1: (values: string) => void;
  setOption2: (values: string) => void;
  isOpen: boolean;
  imageByte1: string;
  imageByte2: string;
  question: Question;
}

export default function VoteButton(ButtonProps: IButtonProps) {
  const [imageModal, setImageModal] = useState<string | null>(null);
  const { question, imageByte2, imageByte1, isOpen, setOption1, setOption2 } =
    ButtonProps;

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
              setValue={setOption1}
              isOpen={isOpen}
              question={question}
              option={question.option1}
              index={1}
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
              setValue={setOption2}
              isOpen={isOpen}
              question={question}
              option={question.option2}
              index={2}
            />
          </Stack>
        </Stack>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
