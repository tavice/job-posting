import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ListOfJobsYouSaved = ({ baseUrl }) => {
  const jobSeekerId = localStorage.getItem("jobseeker_id");
  //console.log("jobSeekerId is ", jobSeekerId);

  const [jobSaved, setJobSaved] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //=================================================================//
  //fetch job saved associated with job seeker

  const fetchJobSaved = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/savedjobs`);
      const data = response.data;
      //console.log("data is ", data);

      const filteredListings = data.filter(
        (item) => item.job_seeker === parseInt(jobSeekerId)
      );
      setJobSaved(filteredListings);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobSaved();
  }, []);

  //console.log("jobSaved are", jobSaved);

  //=================================================================//
  //fetch job listings associated with job saved

  const [jobListings, setJobListings] = useState([]);
  const fetchJobListings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/joblistings`);
      const data = response.data;
      const filteredListings = data.filter((listing) =>
        jobSaved.some((application) => application.job_listing === listing.id)
      );
      setJobListings(filteredListings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (jobSaved.length > 0) {
      fetchJobListings();
    }
  }, [jobSaved]);

  //=================================================================//
  //fetch employer associated with job listings

  const [employers, setEmployers] = useState([]);

  const fetchEmployers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/employers`);
      const data = response.data;
      const filteredEmployers = data.filter((employer) =>
        jobListings.some((listing) => listing.employer === employer.id)
      );
      setEmployers(filteredEmployers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (jobListings.length > 0) {
      fetchEmployers();
    }
  }, [jobListings]);

  //console.log("employers are", employers);

  //=================================================================//
  //render

  //console.log("jobListings are", jobListings);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {jobListings.map((jobListing) => {
        const savedJob = jobSaved.find(
          (job) => job.job_listing === jobListing.id
        );
        const savedDate = savedJob ? savedJob.save_date : "Unknown Date";

        // Find the employer object
        const employer = employers.find(
          (e) => e && e.id === jobListing.employer
        );

        // Check if employer exists before accessing its properties
        const companyName = employer ? employer.companyname : "Unknown Company";

        return (
          <Grid item xs={12} sm={4} md={4} key={jobListing.id} style={{padding:2}}>
            <Stack direction="row" spacing={1} style={{ margin: 20}}>
              <Typography>{jobListing.jobtitle}</Typography>
              <Chip label={jobListing.salary} />
              <Chip label={jobListing.location} />
              <Chip label={savedDate} />
              <Chip label={companyName} />
            </Stack>
          </Grid>
        );
      })}
    </Container>
  );
};

export default ListOfJobsYouSaved;
