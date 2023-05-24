"use client"
import { useStyles } from "@/app/styles/styles";
import { Center, Modal } from "@mantine/core";

interface ImageProps {
  image: string;
  setModal: () => void;
  altText: string;
  fullscreen?: boolean;
}

interface ModalProps {
  imageModal: string | null;
  setModal: () => void;
}

export function VoteImage(props: ImageProps) {
  const { image, setModal, altText, fullscreen } = props;
  const {classes} = useStyles() 
  return (
    <Center>
      <img
        className={fullscreen ? classes.fullscreenImage : undefined}
        alt={altText}
        onClick={() => setModal()}
        src={`${image}`}
        width={500}
        height={500}
        style={fullscreen ? {} : { maxWidth: "5rem", maxHeight: "5rem" }}
      />
    </Center>
  );
}

export function FullscreenImageModal(props: ModalProps) {
  const { imageModal, setModal } = props;

  return (
    <Modal onClose={() => setModal()} opened={imageModal !== null} fullScreen>
      {imageModal && (
        <VoteImage
          altText="Fullscreen option Image"
          image={imageModal}
          setModal={() => setModal()}
          fullscreen
        />
      )}
    </Modal>
  );
}
