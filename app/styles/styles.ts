import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  innerCardWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "space-between",
    height: "100%",
  },
  title: {
    width: "100%",
    overflowWrap: "break-word",
  },
  buttonSelected: {
    border: "2px solid white",
    backgroundColor: theme.colors.nord_success[8],
  },
  buttonUnselected: {
    border: "0px solid white",
    backgroundColor: theme.colors.nord_gray[2],
  },
  voteText: {
    position: "absolute",
    bottom: "0",
    right: ".5rem",
  },
  outerCardWrapper: {
    boxShadow: "0px 5px 10px rgba($color: #ffffff, $alpha: 0.1)",
    width: "100%",
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "space-between",
    alignItems: "space-between",
  },
  fullscreenImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    zIndex: 2,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  icon: {
    color: "#cecece",
    height: "1.2rem",
    cursor: "pointer",
  },
  iconFloating: {
    color: "#cecece",
    height: "1.2rem",
    cursor: "pointer",
    display: "inline",
    fontSize: "0.5rem",
  },
  iconHot: {
    height: "1rem",
    paddingRight: "0.2rem",
  },
  iconHotRed: {
    color: "#e41f24",
    height: "1rem",
    paddingRight: "0.2rem",
  },
}));
