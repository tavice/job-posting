import React, { useState } from "react";
import axios from "axios";
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

    try {
      // Construct the request payload
      const payload = {
        prompt,
        temperature,
      };
      console.log(payload)
      console.log(`payload: ${JSON.stringify(payload)}`);
      

      // Send a POST request to your API endpoint
      const response = await axios.post(`${baseUrl}/generator/chat/`, payload);

      if (response.status === 200) {
        // Access the response data
        const data = response.data;
        const { messages: updatedMessages, formattedResponse } = data;

        // Update the messages state with the updated messages
        setMessages(updatedMessages);
        console.log(`messages: ${JSON.stringify(messages)}`);

        // Append the assistant's response to the messages state
        setMessages((prevMessages) => {
            if (Array.isArray(prevMessages)) {
              return [
                ...prevMessages,
                { role: "assistant", content: formattedResponse },
              ];
            }
            return [
              { role: "assistant", content: formattedResponse },
            ];
          });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };

  //====================================================================================================
  //Handle Prompt Change

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  //====================================================================================================
  //Handle Temperature Change

  const handleTemperatureChange = (event) => {
    setTemperature(parseFloat(event.target.value));
  };

  //====================================================================================================
  //Render

  return (
    <div>
      <h1>Job Offer ASSISTANT</h1>

      {/* <button type="button" onClick={() => history.push("/new_chat")}>
        New Chat +
      </button> */}

      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={index} className="answer-discussion">
            <div>
              <strong>{message.role}</strong>: {message.content}
            </div>
          </div>
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
      </form>
    </div>
  );
};

export default OfferGPT;
