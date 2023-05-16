import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Grid, Paper } from "@mui/material";

const JobListingDetail = ({ baseUrl }) => {
  const { id } = useParams();
  const [jobListing, setJobListing] = useState({});
  const [employer, setEmployer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="job-listing-detail">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {jobListing.jobtitle}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                Salary:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {jobListing.salary}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
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
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default JobListingDetail;
