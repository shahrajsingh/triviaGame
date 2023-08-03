import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

const ChatContainer = styled("div")({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: 999,
  maxWidth: "400px",
  maxHeight: "400px",
  width: "100%",
  backgroundColor: "#f0f0f0",
  borderRadius: "5px",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column",
});

const ChatBody = styled("div")({
  flex: 1,
  overflowY: "auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const MessageBubble = styled("div")({
  padding: "8px",
  borderRadius: "5px",
  marginBottom: "8px",
  display: "inline-block",
  maxWidth: "70%",
});

const BotMessage = styled(MessageBubble)({
  backgroundColor: "#0099ff",
  color: "#fff",
  alignSelf: "flex-start",
  marginBottom: "4px",
  fontSize: "14px", // Reduce font size for bot messages
});

const UserMessage = styled(MessageBubble)({
  backgroundColor: "#e0e0e0",
  alignSelf: "flex-end",
  marginBottom: "4px",
  fontSize: "14px", // Reduce font size for user messages
});

const ChatInput = styled("div")({
  display: "flex",
  alignItems: "center",
  borderTop: "1px solid #ccc",
  padding: "8px 16px",
  backgroundColor: "#f0f0f0",
});

const ChatBox = ({ teamId, gameId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("team_id", "==", teamId),
      where("game_id", "==", gameId),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(fetchedMessages);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [teamId, gameId]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatContainer>
      <ChatBody>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        )}
        <span ref={messagesEndRef}></span>
      </ChatBody>
      <SendMessage />
    </ChatContainer>
  );
};

const Message = ({ message }) => {
  console.log(message);
  return (
    <Paper
      style={{
        borderRadius:
          message.user_name === "vatsal1524"
            ? "20px 20px 0 20px"
            : "20px 20px 20px 0",
        padding: "15px",
        backgroundColor:
          message.user_name === "vatsal1524" ? "#e0e0e0" : "#0099ff",
        color: message.user_name === "vatsal1524" ? "#1c2c4c" : "#fff",
        width: "max-content",
        maxWidth: "calc(100% - 50px)",
        boxShadow: `-2px 2px 1px 1px ${
          message.user_name === "vatsal1524" ? "#88dded" : "#4c768d"
        }`,
        display: "flex",
        alignItems: "flex-start",
        marginBottom: "10px",
        alignSelf:
          message.user_name === "vatsal1524" ? "flex-end" : "flex-start",
      }}
    >
      <Avatar
        style={{
          marginRight: "10px",
          backgroundColor:
            message.user_name === "vatsal1524" ? "#1c2c4c" : "#0099ff", // Correct avatar background color
        }}
      >
        {message.user_name[0]}
      </Avatar>
      <Box>
        <Typography
          variant="body1"
          fontWeight="bold"
          marginBottom="5px"
          style={{
            color: message.user_name === "vatsal1524" ? "#1c2c4c" : "#fff",
            fontSize: "14px", // Reduce font size for the username
          }}
        >
          {message.user_name}
        </Typography>
        <Typography variant="body1" style={{ fontSize: "14px" }}>
          {message.message}
        </Typography>
      </Box>
    </Paper>
  );
};

const SendMessage = () => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const user_name = "vatsal1524";

    await addDoc(collection(db, "messages"), {
      message: message,
      user_name: user_name,
      createdAt: serverTimestamp(),
      game_id: "abcd",
      team_id: "ijkl",
    });
    setMessage("");
  };

  return (
    <ChatInput>
      <TextField
        id="messageInput"
        name="messageInput"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        fullWidth
        variant="outlined"
        inputProps={{
          style: {
            fontSize: "14px", // Reduce font size for the input field
          },
        }}
      />
      <Button
        type="submit"
        onClick={sendMessage}
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </ChatInput>
  );
};

export default ChatBox;
