import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

//Import components
import ListOfJobsYouAppliedTo from "./ListOfJobsYouAppliedTo";
import Profile from "./Profile";

const Dashboard = ({ baseUrl }) => {
  const userType = localStorage.getItem("user_type");
  //Fetch the current user
  const [currentUser, setCurrentUser] = useState({});
  const [jobSeeker, setJobSeeker] = useState({});
  const [jobListings, setJobListings] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);

  //=======================================================//
  //Fetch the current user the user id in the database matches the authenticated_user  id saved in local storage when logged
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/user/${localStorage.getItem("authenticated_user")}`
      );
      const data = response.data;
      setCurrentUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  //console.log("current user is ", currentUser);

  //=======================================================//
  //Fetches all job seekers, matches the user id in the database to the current user id
  const fetchJobSeeker = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/jobseekers`);
      const data = response.data;
      const foundJobSeeker = data.find((item) => item.user === currentUser.id);
      if (foundJobSeeker) {
        setJobSeeker(foundJobSeeker);
      } else {
        console.log("no job seeker found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobSeeker();
  }, []);

  //console.log("job seeker is ", jobSeeker);

  //=======================================================//
  //Fetches all job listings
  const fetchJobListings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/joblistings`);
      const data = response.data;
      setJobListings(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobListings();
  }, []);

  console.log("job listings are ", jobListings);

  //=======================================================//
  //Fetches all job applications
  const fetchJobApplications = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/jobapplications`);
      const data = response.data;
      const foundJobApplication = data.find(
        (item) => item.job_seeker === jobSeeker.id
      );
      if (foundJobApplication) {
        setJobApplications(foundJobApplication);
      } else {
        console.log("no job applications found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobApplications();
  }, []);

  console.log("job applications are ", jobApplications);
  console.log(jobApplications.joblisting);

  //=======================================================//
  //Filtering Job Listings//
  const filterJobListings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/joblistings`);
      const data = response.data;
      const filteredListings = data.filter(
        (listing) => listing.id === jobApplications.joblisting
      );
      setFilteredJobListings(filteredListings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (jobApplications.joblisting) {
      filterJobListings();
    }
  }, []);

  console.log("filtered job listings are ", filteredJobListings);

  //=======================================================//
  //render//
  return (
    <div>
     
      {userType === "E" ? (
        <h1> Employer Dashboard</h1>
      ) : (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Profile baseUrl={baseUrl} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography variant="h4" style={{ marginBottom: 10 }}>
                  {" "}
                  List of the jobs you applied to
                </Typography>
                <ListOfJobsYouAppliedTo baseUrl={baseUrl} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography variant="h4" style={{ marginBottom: 10 }}>
                  {" "}
                  List of the jobs you saved
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default Dashboard;
