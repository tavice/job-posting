import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const ListOfCandidatesYouLiked = ({ baseUrl }) => {
  const employerId = localStorage.getItem("employer_id");
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [users, setUsers] = useState([]);

  //Combine the API calls to fetch candidates, job seekers, and users into a single function to reduce the number of requests.

  // Use async/await with Promise.all() to make parallel API requests for faster data retrieval.
  //https://www.geeksforgeeks.org/explain-promise-all-with-async-await-in-javascript/

  const fetchData = async () => {
    try {
      const [candidatesResponse, jobSeekersResponse, usersResponse] =
        await Promise.all([
          axios.get(`${baseUrl}/api/savedcandidates/`),
          axios.get(`${baseUrl}/api/jobseekers/`),
          axios.get(`${baseUrl}/api/user/`),
        ]);

      const candidatesData = candidatesResponse.data;
      const jobSeekersData = jobSeekersResponse.data;
      const usersData = usersResponse.data;

      const filteredCandidates = candidatesData.filter(
        (item) => parseInt(item.employer) === parseInt(employerId)
      );

      setCandidates(filteredCandidates);
      setJobSeekers(jobSeekersData);
      setUsers(usersData);
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

  // Render
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {candidates.map((candidate) => {
        const jobSeeker = jobSeekers.find(
          (jobSeeker) => jobSeeker.id === candidate.job_seeker
        );

        const user = users.find((user) => user.id === jobSeeker?.user);

        return (
          <Grid container spacing={2} key={candidate.id}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                <Link to={`/find-candidates/${user?.id}`} style={{textDecoration:"none"}}>
                  {user?.first_name} {user?.last_name}:
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" gutterBottom>
                {jobSeeker?.bio}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </Container>
  );
};

export default ListOfCandidatesYouLiked;
