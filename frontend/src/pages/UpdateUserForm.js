import React, { useState, useEffect } from 'react'
import axios from "axios";
import TextField  from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UpdateUserForm = ({ baseUrl }) => {
    const [UpdatedUsername, setUpdatedUsername] = useState({});
    const [username, setUsername] = useState("");
    const[updatedPassword, setUpdatedPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [employers, setEmployers] = useState([]);
    const [jobSeekers, setJobSeekers] = useState([]);

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // try {
        //   await axios.post(`${baseUrl}/api/joblistings/`, {
        //     jobtitle: jobTitle,
        //     description: description,
        //     location: location,
        //     salary: salary,
        //     jobrequirements: jobRequirements,
        //     employer: employerId,
        //   });
        //   setJobTitle("");
        //   setDescription("");
        //   setLocation("");
        //   setSalary("");
        //   setJobRequirements("");
        //   setEmployerId("");
        //   navigate("/");
        // } catch (error) {
        //   console.log(error);
        //   setErrorMessage(error.message);
        // }
      }



    return (
        <div div style={{ padding: 20 }}>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <form className="form-create-job" onSubmit={handleSubmit}>
         <Typography variant="h4" style={{ marginBottom: 20, alignItems:"center", textTransform:'uppercase', color:'black' }}>Login</Typography>
            
              
              <TextField
                label="Enter username"
                type="text"
                id="username"
                value={username}
                variant="standard"
                style={{ marginBottom: 20, width: 200 }}
                onChange={(event) => setUpdatedUsername(event.target.value)}
              />
            
            
              
              <TextField
                label="Enter password"
                type="password"
                id="password"
                value={updatedPassword}
                variant="standard"
                style={{ marginBottom: 20, width: 200 }}
                onChange={(event) => setUpdatedPassword(event.target.value)}
              />
            
            <Button type="submit">Login</Button>
          </form>
        </div>
      );
  
};

export default UpdateUserForm