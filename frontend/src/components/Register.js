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
      <form className="form-create-job" onSubmit={handleSubmit} style={{padding: 20}}>
       <Typography variant="h4" style={{ marginBottom: 20, alignItems:"center", textTransform:'uppercase', color:'black' }}>Register</Typography>
        
          
          <TextField
            label="Username"
            type="text"
            name="username"
            value={username}
            variant="standard"
            style={{ marginBottom: 20, width: 200 }}
            onChange={handleChange}
            required
          />
        
       
         
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            variant="standard"
            style={{ marginBottom: 20, width: 200 }}
            onChange={handleChange}
            required
          />
        
        
          
            
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              variant="standard"
            style={{ marginBottom: 20, width: 200 }}
              onChange={handleChange}
              required
            />
          

          <TextField
           label="First Name"
            type="text"
            name="first_name"
            value={first_name}
            variant="standard"
            style={{ marginBottom: 20, width: 200 }}
            onChange={handleChange}
          />
       
        
         
          <TextField
          label="Last Name"
            type="text"
            name="last_name"
            value={last_name}
            variant="standard"
            style={{ marginBottom: 20, width: 200 }}
            onChange={handleChange}
          />
        
        <FormControl>
          <FormLabel>User Type: </FormLabel>
          <Select
            name="user_type"
            value={user_type}
            onChange={handleChange}
            required
            style={{ marginBottom: 20, width: 200 }}
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
