"use client";

import { useStyles } from "@/app/styles/styles";
import { Center, Modal } from "@mantine/core";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { useState } from "react";
import Image from "next/image";

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
  const [imageUrl, setImageUrl] = useState<string | null>();
  const { classes } = useStyles();
  const storage = getStorage();
  const imageRef = ref(storage, "/");

  listAll(imageRef).then((res) => {
    res.items.forEach((imageRef) => {
      if (imageRef.fullPath === image) {
        getDownloadURL(imageRef).then((url) => setImageUrl(url));
      }
    });
  });

  return (
    <Center>
      {imageUrl &&
        (fullscreen ? (
          <div
            style={{
              position: "fixed",
              height: "100%",
              width: "100%",
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Image
              alt={altText}
              onClick={() => setModal()}
              src={imageUrl}
              fill
              sizes="80vw"
              quality={70}
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                objectFit: "contain",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              position: "relative",
              height: "5rem",
              width: "5rem",
            }}
          >
            <Image
              className={fullscreen ? classes.fullscreenImage : undefined}
              alt={altText}
              onClick={() => setModal()}
              src={imageUrl}
              quality={70}
              sizes="100%"
              fill
              style={fullscreen ? {} : { maxWidth: "5rem", maxHeight: "5rem" }}
            />
          </div>
        ))}
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
