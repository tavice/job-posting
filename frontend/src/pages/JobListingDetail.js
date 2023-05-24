import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Grid, Paper, Button } from "@mui/material";
import Container from "@mui/material/Container";

const JobListingDetail = ({ baseUrl }) => {
  const { id } = useParams();
  const [jobListing, setJobListing] = useState({});
  const [employer, setEmployer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem("authenticated_user");
  const userType = localStorage.getItem("user_type");


  //====================================================================================================
  //fetch job listing

  const fetchJobListing = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/joblistings/${id}`);
      const data = response.data;
      setJobListing(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobListing();
  }, []);

  const fetchEmployer = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/employers/${jobListing.employer}`
      );
      const data = response.data;
      setEmployer(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (jobListing.employer) {
      fetchEmployer();
    }
  }, [jobListing.employer]);

  //====================================================================================================
  //fetch current user

  const [currentUser, setCurrentUser] = useState({});
  

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/${userId}`);
      const data = response.data;
      setCurrentUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [userId]);

  console.log(currentUser);

  //====================================================================================================
  //render

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {jobListing.jobtitle}
            </Typography>
            <p style={{color:'black'}}>apply to this job!</p>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Employer:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {employer.companyname}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Location:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {jobListing.location}
              </Typography>
            
           
              <Typography variant="h6" gutterBottom>
                Description:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {jobListing.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Job Requirements:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {jobListing.jobrequirements}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Salary:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {jobListing.salary}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper elevation={3} sx={{ p: 2 }} style={{display:"flex", flexDirection:"column", padding:20}}>
            <Typography variant="h6" style={{color:"black", marginTop:'20%'}}>Hey {currentUser.first_name} !</Typography>
            <Button variant="contained" color="success" style={{marginTop:'20%'}} href="/apply">
              Apply for this job !
            </Button>
            <Button variant="contained" color="secondary" href="/joblistings" style={{marginTop:'20%'}}>
              Save for later
            </Button>
            <Button variant="contained" color="primary" href="/Job Listings" style={{marginTop:'20%'}}>
              Back to Job Listings
            </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default JobListingDetail;
