import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CandidatesWhoAppliedToYourJob = ({ baseUrl }) => {
  const [jobApplications, setJobApplications] = useState([]);
  const [jobListings, setJobListings] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [user, setUser] = useState({});

  // Get employer id
  const employerId = localStorage.getItem("employer_id");

  // Fetch all the job listings
  const fetchJobListings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/joblistings`);
      const data = response.data;
      const filteredJobListings = data.filter(
        (jobListing) => jobListing.employer === parseInt(employerId)
      );
      setJobListings(filteredJobListings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobListings();
  }, []);

  console.log('job listing is', jobListings);

  // Fetch job applications for each job listing
  const fetchJobApplications = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/jobapplications`);
      const data = response.data;
      console.log(data);
  
      const filteredJobApplications = data.filter((jobApplication) =>
        jobListings.some((jobListing) => jobListing.id === jobApplication.job_listing)
      );
      
      setJobApplications(filteredJobApplications);
    } catch (error) {
      console.log(error);
    }
  };
  

    useEffect(() => {
        fetchJobApplications();
    }, [jobListings]);

    console.log('job application is', jobApplications);

    //fetch job seeker associated with each job application
    const fetchJobSeekers = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/jobseekers`);
            const data = response.data;
            const filteredJobSeekers = data.filter((jobSeeker) =>
                jobApplications.some((jobApplication) => jobApplication.job_seeker === jobSeeker.id)
            );
            setJobSeekers(filteredJobSeekers);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchJobSeekers();
    }, [jobApplications]);

    console.log('job seeker is', jobSeekers);


    //fetch user associated with each job seeker
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/user`);
            const data = response.data;
            const filteredUser = data.filter((user) =>
                jobSeekers.some((jobSeeker) => jobSeeker.user === user.id)
            );
            setUser(filteredUser);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [jobSeekers]);

    console.log('user is', user);



    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Job Title</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Bio</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobApplications.map((jobApplication) => {
                      const jobSeeker = jobSeekers.find(
                        (jobSeeker) => jobSeeker.id === jobApplication.job_seeker
                      );
                      const userMatch = user.find((user) => user.id === jobSeeker.user);
                      const jobListing = jobListings.find(
                        (jobListing) => jobListing.id === jobApplication.job_listing
                      );
    
                      return (
                        <TableRow key={jobApplication.id}>
                          <TableCell component="th" scope="row" style={{textTransform:"uppercase", fontWeight:"bold"}}>
                            {jobListing.jobtitle}
                          </TableCell>
                          <TableCell align="right">{userMatch && userMatch.first_name}{" "}{userMatch && userMatch.last_name}</TableCell>
                          <TableCell align="right">{jobSeeker && jobSeeker.bio}</TableCell>
                          <TableCell align="right">
                            <Chip label={jobApplication.application_status} variant="outlined" />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      );
      
};

export default CandidatesWhoAppliedToYourJob;
