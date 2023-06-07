import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";

import Paper from "@mui/material/Paper";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const CandidatesWhoAppliedToYourJob = ({ baseUrl }) => {
  const [jobApplications, setJobApplications] = useState([]);
  const [jobListings, setJobListings] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbacks, setFeedbacks] = useState({}); // State variable to store feedback for each job application

  // Get employer id
  const employerId = localStorage.getItem("employer_id");

  // Fetch all the job applications, job listings, job seekers, and user data
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

  // Update the application status

  const handleChangeStatus = async (status, applicationId) => {
    console.log(status, applicationId);
    try {
      const applicationToUpdate = jobApplications.find(
        (application) => application.id === applicationId
      );

      console.log("applicationToUpdate", applicationToUpdate);

      await axios.put(`${baseUrl}/api/jobapplications/${applicationId}/`, {
        application_status: status,
        id: applicationId,
        job_seeker: applicationToUpdate.job_seeker,
        job_listing: applicationToUpdate.job_listing,
      });

      console.log(
        "applicationToUpdate.job_seeker",
        applicationToUpdate.job_seeker
      );
      // Update the jobApplications state to reflect the updated status
      const updatedApplications = jobApplications.map((application) =>
        application.id === applicationId // Find the application that was updated and return it
          ? { ...application, application_status: status } // Update the status
          : application
      );
      setJobApplications(updatedApplications);
      window.location.href = "/Dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  // Update the feedback for a specific job application

  const handleChangeFeedback = async (feedback, applicationId) => {
    console.log(feedback, applicationId);
    try {
      const applicationToUpdate = jobApplications.find(
        (application) => application.id === applicationId
      );

      console.log("applicationToUpdate", applicationToUpdate);

      await axios.put(`${baseUrl}/api/jobapplications/${applicationId}/`, {
        application_feedback: feedback,
        id: applicationId,
        job_seeker: applicationToUpdate.job_seeker,
        job_listing: applicationToUpdate.job_listing,
      });

      console.log(
        "applicationToUpdate.job_seeker",
        applicationToUpdate.job_seeker
      );
      // Update the jobApplications state to reflect the updated feedback
      const updatedApplications = jobApplications.map((application) =>
        application.id === applicationId
          ? { ...application, application_feedback: feedback }
          : application
      );
      setJobApplications(updatedApplications);
      // Optionally redirect to another page
      // window.location.href = "/Dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  // Render the table

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
              <TableHead
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                <TableRow>
                  <TableCell align="center">Job Title</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Feedbacks</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobApplications.map((jobApplication, index) => {
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
                        align="center"
                        component="th"
                        scope="row"
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        <Link
                          to={`/Job Listings/${jobListing.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {jobListing.jobtitle}
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <Link
                          to={`/find-candidates/${userMatch?.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {userMatch && userMatch.first_name}{" "}
                          {userMatch && userMatch.last_name}
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          id={`feedback-${jobApplication.id}`} // Unique ID for each feedback input field
                          variant="standard"
                          label="Enter your feedback"
                          value={feedbacks[jobApplication.id] || jobApplication.application_feedback}
                          multiline
                      
                          onChange={(event) =>
                            setFeedbacks((prevFeedbacks) => ({
                              ...prevFeedbacks,
                              [jobApplication.id]: event.target.value,
                            }))
                          } // Update the specific feedback using the job application ID as the key
                        />
                        <IconButton
                          aria-label="submit-feedback"
                          onClick={() =>
                            handleChangeFeedback(
                              feedbacks[jobApplication.id],
                              jobApplication.id
                            )
                          } // Pass the feedback and applicationId to the handleChangeFeedback function
                        >
                          <AddIcon />
                        </IconButton>
                      </TableCell>

                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color={chipColor}
                          onClick={() =>
                            handleChangeStatus(
                              status === "Approved" ? "Rejected" : "Approved",
                              jobApplication.id
                            ) // If the status is approved, change it to rejected, otherwise change it to approved
                          }
                        >
                          {status}
                        </Button>
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
