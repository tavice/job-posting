import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ baseUrl }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //console.log("username is", username);
  //console.log("password is", password);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const body = JSON.stringify({ username, password });
      const response = await axios.post(`${baseUrl}/api/login/`, body, config);
      const token = response.data.token;
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      const data = response.data;
      console.log(data);
      if (data.message === "You are logged in.") {
        console.log("User is logged in.");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
      console.log(error);
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
