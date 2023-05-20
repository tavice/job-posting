import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


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
      const body = { username, password };
      const response = await axios.post(`${baseUrl}/api/login/`, body);
       // Extract the CSRF token from the response headers instead of the response body/data
      
      const token = response.headers['x-csrftoken']; 
      axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
      
      console.log('token is', token)
      console.log('Response headers:', response.headers);
     
      const data = response.data;
      console.log(data)
      
      if (data.message === "Login successful.") {
        console.log("User is logged in.");
        console.log(data)
        localStorage.setItem("authenticated_user", data.data.user_id);
        localStorage.setItem("user_type", data.data.userjob_type);
        localStorage.setItem("csrf_token", data.data.csrf_token);
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        navigate("/Home");
        //window.location.href = "/Home";
      }
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    }
  };


  return (
    <div div style={{ padding: 20 }}>
     <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <div className="error">{error}</div>}
      <form className="form-create-job" onSubmit={handleSubmit}>
        
          <label htmlFor="username">Username:</label>
          <TextField
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        
        
          <label htmlFor="password">Password:</label>
          <TextField
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
