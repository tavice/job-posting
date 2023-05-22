import React, { useState } from 'react';

const OfferGPT = () => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.1);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Construct the request payload
      const payload = {
        prompt,
        temperature,
      };

      // Send a POST request to your API endpoint
      const response = await fetch('/generator/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Parse the response
        const data = await response.json();
        const { messages: updatedMessages, formattedResponse } = data;

        // Update the messages state with the updated messages
        setMessages(updatedMessages);

        // Append the assistant's response to the messages state
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: formattedResponse },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    }
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(parseFloat(event.target.value));
  };

  return (
    <div className="row justify-content-center my-4">
      <div className="col-md-7 mt-4">
        <div className="card">
          <h1 className="card-header text-center">A.I WEB ASSISTANT</h1>
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-primary mb-3">New Chat +</button>
            </div>
            <div className="chat-history mb-3">
              {messages.map((message, index) => (
                <div key={index} className={`card mb-2 ${message.role === 'assistant' ? 'bg-success text-white' : ''}`}>
                  <div className="card-body p-2">
                    <strong>{message.role}</strong>: {message.content}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <input className="form-control mb-2" required type="text" autoFocus name="prompt" value={prompt} onChange={handlePromptChange} />
              <label htmlFor="temperature" className="form-label">Temperature:</label>
              <input className="form-control mb-2" type="number" step="0.01" min="0" max="2" name="temperature" value={temperature} onChange={handleTemperatureChange} id="temperature" />
              <button className="btn btn-success fw-bold" type="submit">
                GENERATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferGPT;
