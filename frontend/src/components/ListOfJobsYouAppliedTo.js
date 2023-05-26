import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

const ListOfJobsYouAppliedTo = ({ baseUrl }) => {
  const [jobApplications, setJobApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const jobSeekerId = localStorage.getItem("jobseeker_id");
  console.log("jobSeekerId is ", jobSeekerId);

  //=================================================================//
  //fetch job applications associated with job seeker

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/jobapplications`);
      const data = response.data;
      console.log("data is ", data);

      const filteredListings = data.filter(
        (item) => item.job_seeker === parseInt(jobSeekerId)
      );
      setJobApplications(filteredListings);
      setIsLoading(false);
      console.log("filtered listings are ", filteredListings);
      console.log("job applications are ", jobApplications);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  console.log("jobApplications are", jobApplications);

  useEffect(() => {
    fetchJobApplications();
  }, []);

  //=================================================================//
  //fetch job listings associated with job applications

  const [jobListings, setJobListings] = useState([]);

  const fetchJobListings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/joblistings`);
      const data = response.data;
      const filteredListings = data.filter((listing) =>
        jobApplications.some(
          (application) => application.job_listing === listing.id
        )
      );
      setJobListings(filteredListings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (jobApplications.length > 0) {
      fetchJobListings();
    }
  }, [jobApplications]);

  console.log(jobListings);

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

  console.log("employers are", employers);

  //=================================================================//

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {jobListings.map((listing) => {
        const employer = employers.find((e) => e.id === listing.employer);
        const jobApplication = jobApplications.find(
          (app) => app.job_listing === listing.id
        );
        const status = jobApplication
          ? jobApplication.application_status
          : "Unknown Status";
        let chipColor;

        if (status === "Pending") {
          chipColor = "warning";
        } else if (status === "Approved") {
          chipColor = "success";
        } else if (status === "Rejected") {
          chipColor = "error";
        } else {
          chipColor = "default";
        }

        return (
          <Grid container spacing={1} key={listing.id}>
            <Typography variant="h5" style={{ marginBottom: 10 }}>
              {listing.jobtitle} - {employer ? employer.companyname : ""} - {"  "}
              <Chip label={status} color={chipColor} />
            </Typography>
          </Grid>
        );
      })}
    </Container>
  );
};

export default ListOfJobsYouAppliedTo;
