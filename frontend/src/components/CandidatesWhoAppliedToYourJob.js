import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const CandidatesWhoAppliedToYourJob = ({ baseUrl }) => {
  const [jobApplications, setJobApplications] = useState([]);
  const [jobListings, setJobListings] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get employer id
  const employerId = localStorage.getItem("employer_id");

  //fetch all the data using Promise.all (need job listings, job applications, job seekers, user) and filter them
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          listingsResponse,
          applicationsResponse,
          seekersResponse,
          userResponse,
        ] = await Promise.all([
          axios.get(`${baseUrl}/api/joblistings`),
          axios.get(`${baseUrl}/api/jobapplications`),
          axios.get(`${baseUrl}/api/jobseekers`),
          axios.get(`${baseUrl}/api/user`),
        ]);

        const listings = listingsResponse.data;
        const applications = applicationsResponse.data;
        const seekers = seekersResponse.data;
        const userData = userResponse.data;

        const filteredJobListings = listings.filter(
          (jobListing) => jobListing.employer === parseInt(employerId)
        );
        setJobListings(filteredJobListings);

        const filteredJobApplications = applications.filter((jobApplication) =>
          filteredJobListings.some(
            (jobListing) => jobListing.id === jobApplication.job_listing
          )
        );
        setJobApplications(filteredJobApplications);

        const filteredJobSeekers = seekers.filter((jobSeeker) =>
          filteredJobApplications.some(
            (jobApplication) => jobApplication.job_seeker === jobSeeker.id
          )
        );
        setJobSeekers(filteredJobSeekers);

        const filteredUser = userData.filter((user) =>
          filteredJobSeekers.some((jobSeeker) => jobSeeker.user === user.id)
        );
        setUser(filteredUser);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, employerId]);

  //===============================================================================================================
  //render

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (user.length === 0) {
    return <div>No applications yet</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead  style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell align="center">Name</TableCell>

                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobApplications.map((jobApplication) => {
                  const jobSeeker = jobSeekers.find(
                    (jobSeeker) => jobSeeker.id === jobApplication.job_seeker
                  );
                  const userMatch = user.find(
                    (user) => user.id === jobSeeker.user
                  );
                  const jobListing = jobListings.find(
                    (jobListing) => jobListing.id === jobApplication.job_listing
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
                    <TableRow key={jobApplication.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      
                      >
                        <Link to={`/Job Listings/${jobListing.id}`} style={{textDecoration:"none"}}>

                        {jobListing.jobtitle}
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                      <Link to={`/find-candidates/${userMatch?.id}`} style={{textDecoration:"none"}}>
                        {userMatch && userMatch.first_name}{" "}
                        {userMatch && userMatch.last_name}
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={jobApplication.application_status}
                         
                          color={chipColor}
                        />
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
