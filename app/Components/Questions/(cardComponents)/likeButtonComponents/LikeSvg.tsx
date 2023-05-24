"use client"
import { useStyles } from "@/app/styles/styles";
import { motion } from "framer-motion";

const iconColors = {
  unLiked: "#003049",
  liked: "#e41f24"
}

interface Props {
  likeStatus: boolean;
}

export default function LikeSvg(props: Props) {
  const { likeStatus } = props;
  const {classes} = useStyles()
  return (
    <motion.svg
      whileHover={{
        skewX: [0, 10, 0, -10, 0],
        skewY: [0, 10, 0, -10, 0],
        transformOrigin: "bottom",
        transition: {
          duration: 0.4,
          ease: "linear",
          repeat: 1,
        },
      }}
      className={likeStatus ? classes.iconHotRed : classes.iconHot}
      viewBox="0 0 220 312"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M109.171 146.264C108.883 146.69 108.966 147.266 109.362 147.594C120.518 156.831 131.068 161.73 143.071 156.928C149.002 154.556 155.189 149.847 161.923 142.329C168.467 135.023 175.567 125.019 183.485 111.813C191.773 121.502 200.497 136.789 207.232 153.133C214.213 170.074 219 188.012 219 201.882C219 230.822 207.516 258.577 187.074 279.041C166.633 299.504 138.908 311 110 311C81.0918 311 53.3673 299.504 32.9257 279.041C12.4842 258.577 1 230.822 1 201.882C1 169.831 15.0959 133.745 37.3832 110.815C38.1805 109.996 38.9909 109.167 39.8123 108.326C61.7987 85.8161 91.7254 55.1773 92.645 2.49664C101.6 12.5221 114.06 34.339 120.488 60.1639C127.325 87.6316 127.287 119.424 109.171 146.264Z"
        fill={likeStatus ? iconColors.liked : "#ffffff"}
        stroke={likeStatus ? iconColors.liked : "#ffffff"}
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
