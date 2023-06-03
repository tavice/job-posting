import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ListOfCandidatesYouLiked = ({ baseUrl }) => {
  const employerId = localStorage.getItem("employer_id");
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobSeekers, setJobSeekers] = useState([]);

  // Fetch all the candidates that the employer liked
  const fetchCandidates = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/savedcandidates/`);
      const data = response.data;
      const filteredData = data.filter(
        (item) => parseInt(item.employer) === parseInt(employerId)
      );

      setCandidates(filteredData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Fetch all the job seekers associated with the candidates
  const fetchJobSeekers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/jobseekers/`);
      const data = response.data;
      const filteredData = data.filter((item) =>
        candidates.some((application) => application.job_seeker === item.id)
      );
      setJobSeekers(filteredData);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchJobSeekers();
  }, []);

  //fetch all the users associated with the job seekers
  const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/user/`);
            const data = response.data;
            const filteredData = data.filter((item) =>
            jobSeekers.some((application) => application.user === item.id)
            );
            setUsers(filteredData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [jobSeekers]);

  console.log("candidates are", candidates);
  console.log("job seekers are", jobSeekers);
  console.log("users are", users);

  //Combine the API calls to fetch candidates, job seekers, and users into a single function to reduce the number of requests.

// Use async/await with Promise.all() to make parallel API requests for faster data retrieval.
//https://www.geeksforgeeks.org/explain-promise-all-with-async-await-in-javascript/

  // Render
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
     
      {users.map((user) => (
        <Grid container spacing={2} key={user.id}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
            <Link to={`/find-candidates/${user.id}`}> {user.first_name} {user.last_name}:  </Link>
            </Typography>
          </Grid>
          {jobSeekers.map((jobSeeker) => {
            if (jobSeeker.user === user.id) {
              return (
                <Grid item xs={12} sm={6} key={jobSeeker.id}>
                  <Typography variant="body1" gutterBottom>
                    {jobSeeker.bio}
                  </Typography>
                
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
      ))}
    </Container>
  );
  
};

export default ListOfCandidatesYouLiked;
