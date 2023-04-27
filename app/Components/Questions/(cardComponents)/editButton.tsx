"use client";
import { dots } from "@/app/framer";
import { motion } from "framer-motion";

interface IButtonProps {
  toggleOpen: () => void;
  isOpen: boolean;
}

export default function EditButton(ButtonProps: IButtonProps) {
  const { isOpen, toggleOpen } = ButtonProps;
  return (
    <motion.div onClick={() => toggleOpen()} className="icon-edit">
      <motion.div
        className="dot"
        variants={dots}
        initial={{ y: 0 }}
        animate={isOpen ? "top" : "closed"}
      />
      <motion.div className="dot" />
      <motion.div
        className="dot"
        variants={dots}
        initial={{ y: 0 }}
        animate={isOpen ? "bottom" : "closed"}
      />
    </motion.div>
  );
}
