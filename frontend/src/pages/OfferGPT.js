import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, Grid, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import HandshakeIcon from "@mui/icons-material/Handshake";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import SpaIcon from "@mui/icons-material/Spa";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
//import { useHistory } from "react-router-dom";

const OfferGPT = ({ baseUrl }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.1);

  //console.log(`baseUrl: ${baseUrl}`);
  //const history = useHistory();

  //====================================================================================================
  //Handle Submit

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`prompt: ${prompt}`);
    console.log(`temperature: ${temperature}`);

    try {
      // Construct the request payload
      const body = {
        prompt,
        temperature,
      };

      console.log(body);
      console.log(`payload: ${JSON.stringify(body)}`);

      // Send a POST request to your API endpoint
      const response = await axios.post(`${baseUrl}/generator/chat/`, body);

      if (response.status === 200) {
        // Access the response data
        const data = response.data;
        const { messages: updatedMessages, formattedResponse } = data;

        // Update the messages state with the updated messages
        setMessages((prevMessages) => {
          if (Array.isArray(prevMessages)) {
            return [
              ...prevMessages,
              { role: "assistant", content: formattedResponse },
            ];
          }
          return [{ role: "assistant", content: formattedResponse }];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };

  console.log("messages: ", messages);

  //====================================================================================================
  //Handle Prompt Change

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  console.log("prompt: ", prompt);

  //====================================================================================================
  //Handle Temperature Change

  const handleTemperatureChange = (event) => {
    setTemperature(parseFloat(event.target.value));
  };

  console.log("temperature: ", temperature);

  //====================================================================================================
  //Organize Messages into clear paragraphs etc...

  const organizeMessages = (messages) => {
    if (messages.length === 0) {
      return [];
    }
  };

  //====================================================================================================
  //Handle Clear Chat

  const handleClearChat = (event) => {
    setMessages([]);
    setPrompt("");
    setTemperature(0.1);
  };

  //====================================================================================================
  //Render

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" style={{ marginBottom: 10 }}>
        JobGPT
      </Typography>

      {/* <button type="button" onClick={() => history.push("/new_chat")}>
        New Chat +
      </button> */}

      <div className="chat-history">
        {messages.map((message, index) => (
          <Paper
            style={{ padding: 20 }}
            key={index}
            className="answer-discussion"
          >
            <Paper>
              <strong>{message.role}</strong>: {message.content}
            </Paper>
            <Paper>
              <strong>Assistant:</strong> {message.content.answer}
            </Paper>
          </Paper>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="enter prompt"
          autoFocus
          name="prompt"
          value={prompt}
          onChange={handlePromptChange}
        />
        <label htmlFor="temperature" style={{ color: "black" }}>
          Temperature:
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="2"
          name="temperature"
          value={temperature}
          onChange={handleTemperatureChange}
          id="temperature"
        />
        <button type="submit">GENERATE</button>
        <button type="button" onClick={handleClearChat}>
          CLEAR CHAT
        </button>
      </form>
    </Container>
  );
};

export default OfferGPT;
