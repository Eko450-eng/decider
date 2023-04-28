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
}));
