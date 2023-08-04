import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chatBubble: {
    borderRadius: "20px 20px 20px 0",
    padding: theme.spacing(0.5),
    background: "#7cc5d9",
    color: "#1c2c4c",
    width: "max-content",
    maxWidth: "calc(100% - 50px)",
    boxShadow: "-1px 1px 1px 1px #4c768d", // Adjust the boxShadow for right chat bubble
    display: "flex",
    alignItems: "flex-start",
    marginBottom: theme.spacing(1),
    height: "18%",
    overflowWrap: "break-word",
  },
  chatBubbleRight: {
    padding: theme.spacing(1),

    display: "flex",
    marginLeft: "auto",
    borderRadius: "20px 20px 0 20px",
    background: "#fff",
    boxShadow: "-1px 1px 1px 1px #88dded", // Adjust the boxShadow for left chat bubble
  },
  chatBubbleLeft: {
    marginRight: theme.spacing(1),
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0.5),
    // Add a border to the left chat bubble
  },

  userName: {
    fontWeight: "bold",
    marginBottom: theme.spacing(0.5),
    fontSize: "0.8rem",
    color: "#1c2c4c",
  },
  userMessage: {
    wordBreak: "break-all",

    fontSize: "0.8rem",
  },
}));

const Message = ({ message }) => {
  const classes = useStyles();
  const user_name = "vatsal1524";

  return (
    <div
      className={`${classes.chatBubble} ${
        message.user_name === user_name
          ? classes.chatBubbleRight
          : classes.chatBubbleLeft
      }`}
    >
      {message.user_name !== user_name && (
        <div className={classes.chatBubbleLeft} />
      )}
      <div className={classes.chatBubble__right}>
        <p className={classes.userName}>{message.user_name}</p>
        <p className={classes.userMessage}>{message.message}</p>
      </div>
    </div>
  );
};

export default Message;