import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const NewJobListingForm = ({ baseUrl }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [employerId, setEmployerId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [employers, setEmployers] = useState([]);

  const navigate = useNavigate();

  //================================================================//
  //Fetch all employers
  const fetchEmployers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/employers/`);
      const data = response.data.map((employer) => {
        return { ...employer, name: employer.companyname };
      });
      setEmployers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  console.log(employers);
  //================================================================//
  // Creating a new job listing
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseUrl}/api/joblistings/`, {
        jobtitle: jobTitle,
        description: description,
        location: location,
        salary: salary,
        jobrequirements: jobRequirements,
        employer: employerId,
      });
      setJobTitle("");
      setDescription("");
      setLocation("");
      setSalary("");
      setJobRequirements("");
      setEmployerId("");

      console.log("Job Listing Created");
      navigate("/Job Listings");
    } catch (error) {
      console.log(error);
      setErrorMessage("There was an error creating the job listing.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
        
      <form className="form-create-job" onSubmit={handleFormSubmit} style={{padding: 20}}>
      <Typography variant="h4" style={{ marginBottom: 20, alignItems:"center", textTransform:'uppercase', color:'black' }}>Create a New Job Listing</Typography>
        <TextField
          required
          label="Job Title"
          type="text"
          id="job-title"
          value={jobTitle}
          variant="standard"
          style={{ marginBottom: 20, width: 500 }}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <TextField
        required
          label="Job Description"
          type="text"
          id="description"
          multiline
          value={description}
          variant="standard"
          style={{ marginBottom: 20, width: 500 }}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
        required
          label="Job Location"
          type="text"
          id="location"
          variant="standard"
          style={{ marginBottom: 20, width: 500 }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <TextField
        required
          label="Enter Job Salary"
          type="text"
          id="salary"
          variant="standard"
          style={{ marginBottom: 20, width: 500 }}
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <TextField
        required
          label="Enter Job Requirements"
          type="text"
          id="job-requirements"
          variant="standard"
          style={{ marginBottom: 20, width: 500 }}
          value={jobRequirements}
          onChange={(e) => setJobRequirements(e.target.value)}
        />

        <FormControl>
          <FormLabel>Select Company: </FormLabel>
          <Select
            labelId="select-employer"
            id="employer-id"
            value={employerId}
            style={{ marginBottom: 20, width: 500 }}
            onChange={(e) => setEmployerId(e.target.value)}
          >
            {employers.map((employer) => (
              <MenuItem key={employer.id} value={employer.id}>
                {employer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" type="submit">
          Create Job Listing
        </Button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default NewJobListingForm;
