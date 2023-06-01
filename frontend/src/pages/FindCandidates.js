import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import Container from "@mui/material/Container";

const FindCandidates = ({ baseUrl }) => {
  const [jobseeker, setJobseeker] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resume, setResume] = useState([]);

  // Fetch all the job seekers
  const fetchJobseeker = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/jobseekers`);
      const data = response.data;
      setJobseeker(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobseeker();
  }, []);

  // Fetch all the users where their ID matches the user in jobseeker
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user`);
      const data = response.data;

      const filteredUser = data.filter((user) =>
        jobseeker.some((jobseeker) => jobseeker.user === user.id)
      );

      setUser(filteredUser);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Fetch all the resumes
  const fetchResume = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/resume`);
      const data = response.data;
      setResume(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  // Render the list of job seekers
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom>
        Find Candidates
      </Typography>
      <Grid container spacing={2}>
        {jobseeker.map((jobseeker) => {
          const userMatch = user.find((user) => user.id === jobseeker.user);
          const resumeMatch = resume.find(
            (resume) => resume.jobseeker === jobseeker.id
          );

          if (!resumeMatch) {
            return (
              <Grid item xs={12} sm={6} key={userMatch.id}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {userMatch.first_name} {userMatch.last_name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {jobseeker.bio}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Email: {userMatch.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Skills: Resume not shared yet
                  </Typography>
                </Paper>
              </Grid>
            );
          }

          if (userMatch) {
            return (
              <Grid item xs={12} sm={6} key={userMatch.id}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {userMatch.first_name} {userMatch.last_name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {jobseeker.bio}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Email: {userMatch.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Skills: {resumeMatch.skills}
                  </Typography>
                </Paper>
              </Grid>
            );
          }

          return null;
        })}
      </Grid>
    </Container>
  );
};

export default FindCandidates;
