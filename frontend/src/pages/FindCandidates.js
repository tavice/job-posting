import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Typography, Grid, Paper, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const FindCandidates = ({ baseUrl }) => {
  const [jobseeker, setJobseeker] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resume, setResume] = useState([]);
  const [filter, setFilter] = useState(""); // Filter state

  const navigate = useNavigate();

  // Fetch all the job seekers, users, and resumes
  const fetchData = async () => {
    try {
      const [jobseekerResponse, userResponse, resumeResponse] = await Promise.all([
        axios.get(`${baseUrl}/api/jobseekers`),
        axios.get(`${baseUrl}/api/user`),
        axios.get(`${baseUrl}/api/resume`),
      ]);

      const jobseekerData = jobseekerResponse.data;
      const userData = userResponse.data;
      const resumeData = resumeResponse.data;

      setJobseeker(jobseekerData);
      setUser(userData);
      setResume(resumeData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Apply filter to find the perfect skill match
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredJobSeekers = jobseeker.filter((jobseeker) => {
    const resumeMatch = resume.find(
      (resume) => resume.jobseeker === jobseeker.id
    );

    if (!resumeMatch) {
      return false;
    }

    const skillsMatch = resumeMatch.skills.some((skill) =>
      skill.toLowerCase().includes(filter.toLowerCase())
    );

    return skillsMatch;
  });

  // Render the list of job seekers

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {isLoading ? (
        <CircularProgress />
      ) : (
        <>
      <Typography variant="h3" gutterBottom>
        Find Candidates
      </Typography>
      <TextField
        id="filter"
        label="Type the skills needed to find the right candidate!"
        variant="outlined"
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: 16 }}
      />
      <Grid container spacing={2}>
        {filteredJobSeekers.map((jobseeker) => {
          const userMatch = user.find((user) => user.id === jobseeker.user);
          const resumeMatch = resume.find(
            (resume) => resume.jobseeker === jobseeker.id
          );

          if (!resumeMatch) {
            return (
              <Grid item xs={12} sm={6} key={userMatch && userMatch.id}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {userMatch.first_name} {userMatch.last_name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {jobseeker.bio}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Email: </strong>
                    {userMatch.email}
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
                    <Link to={`/find-candidates/${userMatch.id}`}>
                      {userMatch.first_name} {userMatch.last_name}
                    </Link>
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    {jobseeker.bio}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Email:</strong> {userMatch.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Skills:</strong>
                  </Typography>
                  <div>
                    {resumeMatch.skills.map((skill, index) => (
                      <Chip
                        color="secondary"
                        key={index}
                        label={skill}
                        style={{ marginRight: 5 }}
                      />
                    ))}
                  </div>
                
                </Paper>
              </Grid>
            );
          }

          return null;
        })}
      </Grid>
      </>
      )}
    </Container>
  );
};

export default FindCandidates;
