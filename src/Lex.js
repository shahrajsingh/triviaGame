import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import axios from "axios";

const ChatContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "350px", // Make the chat container a little bigger
  position: "fixed",
  bottom: "20px",
  border: "1px solid #0099ff",
  right: "20px",

  borderRadius: "5px",
  boxShadow: "0 0 5px #ccc",
  backgroundColor: "#f0f0f0", // Set the background color to match the chat header background
});

const ChatHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 16px",
  backgroundColor: "#0099ff",
  borderBottom: "1px solid #0099ff",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  cursor: "pointer",
});

const ChatBody = styled("div")({
  padding: "16px",
  maxHeight: "300px",
  minHeight: "300px", // Set the max height of the chat body
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  flex: 1, // Allow the chat body to expand and fill the available vertical space
});

const MessageBubble = styled("div")({
  padding: "8px",
  borderRadius: "5px",
  marginBottom: "8px",
  display: "inline-block", // Change from "block" to "inline-block"
  maxWidth: "70%", // Add max-width to make the chat bubble wrap text
});

const BotMessage = styled(MessageBubble)({
  backgroundColor: "#0099ff",
  color: "#fff",
  alignSelf: "flex-start", // Align bot messages to the left
  marginBottom: "4px", // Add some spacing between bot messages
});

const UserMessage = styled(MessageBubble)({
  backgroundColor: "#e0e0e0",
  alignSelf: "flex-end", // Align user messages to the right
  marginBottom: "4px", // Add some spacing between user messages
});

const ChatInput = styled("div")({
  display: "flex",
  alignItems: "center",
  borderTop: "1px solid #ccc",
  padding: "8px 16px",
  backgroundColor: "#f0f0f0", // Set the background color to match the chat container
});

const Lex = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    // Scroll the chat body to the bottom when a new message is added
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };
  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, isUserMessage: true },
    ]);
    setUserInput("");

    try {
      const response = await axios.post(
        "https://hh4g1l7yu8.execute-api.us-east-1.amazonaws.com/dev/get-bot-response",
        {
          username: "kaby11",
          text: userInput,
        }
      );
      console.log(response);
      const botResponse = response.data.body.message;
      console.log(botResponse);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, isUserMessage: false },
      ]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  return (
    <ChatContainer>
      <ChatHeader onClick={toggleChat}>
        {isOpen ? <span>&#x25BC;</span> : <span>&#x25B2;</span>}
        Chat with Bot
      </ChatHeader>
      {isOpen && (
        <>
          <ChatBody ref={chatBodyRef}>
            {messages.map((message, index) =>
              message.isUserMessage ? (
                <UserMessage key={index}>{message.text}</UserMessage>
              ) : (
                <BotMessage key={index}>{message.text}</BotMessage>
              )
            )}
          </ChatBody>
          <ChatInput>
            <TextField
              value={userInput}
              onChange={handleUserInput}
              label="Type a message..."
              fullWidth
              variant="outlined"
            />
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Send
            </Button>
          </ChatInput>
        </>
      )}
    </ChatContainer>
  );
};

export default Lex;
