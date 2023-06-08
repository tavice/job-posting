import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UpdateJobOffer = ({ baseUrl }) => {
    const { id } = useParams();
    const [jobTitle, setJobTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [jobRequirements, setJobRequirements] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [employer, setEmployer] = useState({});
    const navigate = useNavigate();
    const userType = localStorage.getItem("user_type");
    const employerId = localStorage.getItem("employer_id");
  
    useEffect(() => {
      const fetchJobListing = async () => {
        try {
          const [jobResponse, employerResponse] = await Promise.all([
            axios.get(`${baseUrl}/api/joblistings/${id}`),
            axios.get(`${baseUrl}/api/employers/${employerId}`)
          ]);
          const jobData = jobResponse.data;
          const employerData = employerResponse.data;
          setJobTitle(jobData.jobtitle);
          setDescription(jobData.description);
          setLocation(jobData.location);
          setSalary(jobData.salary);
          setJobRequirements(jobData.jobrequirements);
          setEmployer(employerData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchJobListing();
    }, [baseUrl, id]);

    console.log(employer);
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`${baseUrl}/api/joblistings/${id}/`, {
          jobtitle: jobTitle,
          description: description,
          location: location,
          salary: salary,
          jobrequirements: jobRequirements,
          employer: employerId,
        });
        console.log("Job Listing Updated");
       window.location.reload();
       window.location.href = "/Dashboard";
      } catch (error) {
        console.log(error);
        setErrorMessage("There was an error updating the job listing.");
      }
    };

    console.log(employer);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {userType === "E" ? (
        <>
          {errorMessage && (
            <Typography variant="h6" color="error">
              {errorMessage}
            </Typography>
          )}
          <form
            className="form-create-job"
            onSubmit={handleFormSubmit}
            style={{ padding: 20, width: "50%" }}
          >
            <Typography
              variant="h4"
              style={{
                marginBottom: 20,
                alignItems: "center",
                textTransform: "uppercase",
                color: "black",
              }}
            >
              Update job offer for {employer.companyname}
            </Typography>
            <TextField
              required
              label="Job Title"
              type="text"
              id="job-title"
              value={jobTitle}
              variant="standard"
              style={{ marginBottom: 20, width: "90%" }}
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
              style={{ marginBottom: 20, width: "90%" }}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              required
              label="Job Location"
              type="text"
              id="location"
              variant="standard"
              style={{ marginBottom: 20, width: "90%" }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <TextField
              required
              label="Enter Job Salary"
              type="text"
              id="salary"
              variant="standard"
              style={{ marginBottom: 20, width: "90%" }}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />

            <TextField
              required
              label="Enter Job Requirements"
              type="text"
              id="job-requirements"
              variant="standard"
              style={{ marginBottom: 20, width: "90%" }}
              value={jobRequirements}
              onChange={(e) => setJobRequirements(e.target.value)}
            />

            <TextField
              required
              type="text"
              id="employer"
              variant="standard"
              color="primary"
              style={{ marginBottom: 20, width: "90%" }}
              value={employer.companyname}
            />

            <Button variant="contained" type="submit">
              Update Job Offer
            </Button>
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </>
      ) : (
        <Typography variant="h6" color="error">
          You are not authorized to access this page. Please log in as an employer.
        </Typography>
      )}
    </Container>
  );
};

export default UpdateJobOffer;
