import React, { useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const ApplyToJob = ({baseUrl}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post(`${baseUrl}/api/jobapplications/`, {
            name: name,
            email: email,
            resume: resume,
            coverLetter: coverLetter,

        });
        setName("");
        setEmail("");
        setResume("");
        setCoverLetter("");

        console.log("Job application submitted successfully");
        navigate("/dashboard");

    } catch (error) {
        console.error("Error:", error);
    }

  
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        style={{
          marginBottom: 20,
          alignItems: "center",
          textTransform: "uppercase",
          color: "white",
        }}
      >
        Job Application Form
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="form-create-job"
        style={{ padding: 20, width: "50%" }}
      >
        <TextField
          type="text"
          id="name"
          label="Name"
          value={name}
          variant="standard"
          style={{ marginBottom: 20, width: "90%" }}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          type="email"
          label="Email"
          placeholder="Enter your email"
          id="email"
          value={email}
          variant="standard"
          style={{ marginBottom: 20, width: "90%" }}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div>
          <label htmlFor="resume">Resume:</label>
          <input
            type="file"
            id="resume"
            placeholder="Upload your resume"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />
        </div>

        <label htmlFor="coverLetter">Cover Letter:</label>
        <TextField
          id="coverLetter"
          value={coverLetter}
          variant="outlined"
          multiline
          style={{ marginBottom: 20, width: "90%" }}
          onChange={(e) => setCoverLetter(e.target.value)}
          required
        />

        <button type="submit">Submit Application</button>
      </form>
    </Container>
  );
};

export default ApplyToJob;
