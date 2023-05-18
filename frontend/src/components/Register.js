import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Register = ({ baseUrl }) => {

    const navigate = useNavigate();

    //================================================================//
    // Registering a new user
  const [formData, setFormData] = useState({
    password: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    user_type: "",
  });

  const { password, username, email, first_name, last_name, user_type } =
    formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      password,
      username,
      email,
      first_name,
      last_name,
      user_type,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(newUser);

      const res = await axios.post(`${baseUrl}/api/register/`, body, config);

      console.log(res.data);
        navigate("/Home");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Register</h1>
      <form className="form-create-job" onSubmit={handleSubmit} style={{padding: 20}}>
        
          <label>Username: </label>
          <TextField
            label="Username"
            type="text"
            name="username"
            value={username}
            //style={{ marginBottom: 20, width: 500 }}
            onChange={handleChange}
            required
          />
        
       
          <label>Email: </label>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        
        
          
            <label>Password: </label>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          

          <label>First Name: </label>
          <TextField
           label="First Name"
            type="text"
            name="first_name"
            value={first_name}
            onChange={handleChange}
          />
       
        
          <label>Last Name: </label>
          <TextField
          label="Last Name"
            type="text"
            name="last_name"
            value={last_name}
            onChange={handleChange}
          />
        
        <FormControl>
          <FormLabel>User Type: </FormLabel>
          <Select
            name="user_type"
            value={user_type}
            onChange={handleChange}
            required
          >
            <MenuItem value="">Select User Type</MenuItem>
            <MenuItem value="E">Employer</MenuItem>
            <MenuItem value="J">Job Seeker</MenuItem>
          </Select>
        </FormControl>

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
