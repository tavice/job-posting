import React, { useState } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


const Login = ({ baseUrl }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


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
        localStorage.setItem("username", data.data.username);
        localStorage.setItem("jobseeker_id", data.data.jobseeker_id);
        localStorage.setItem("employer_id", data.data.employer_id);
        localStorage.setItem("token", data.token);
        //navigate("/Home");
        window.location.href = "/Home";
      }
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    }
  };


  return (
    <div div style={{ padding: 20 }}>
      {error && <div className="error">{error}</div>}
      <form className="form-create-job" onSubmit={handleSubmit}>
     <Typography variant="h4" style={{ marginBottom: 20, alignItems:"center", textTransform:'uppercase', color:'black' }}>Login</Typography>
        
          
          <TextField
            label="Enter username"
            type="text"
            id="username"
            value={username}
            variant="standard"
            style={{ marginBottom: 20, width: 200 }}
            onChange={(event) => setUsername(event.target.value)}
          />
        
        
          
          <TextField
            label="Enter password"
            type="password"
            id="password"
            value={password}
            variant="standard"
            style={{ marginBottom: 20, width: 200 }}
            onChange={(event) => setPassword(event.target.value)}
          />
        
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
