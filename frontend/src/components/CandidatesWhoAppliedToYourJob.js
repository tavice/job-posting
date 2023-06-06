import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";

const CandidatesWhoAppliedToYourJob = ({ baseUrl }) => {
  const [jobApplications, setJobApplications] = useState([]);
  const [jobListings, setJobListings] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

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

  console.log("jobApplications", jobApplications);

  // Update the application status

  const handleChangeStatus = async (status, applicationId) => {
    console.log("status", status);
    console.log("applicationId", applicationId);
    try {
      await axios.put(`${baseUrl}/api/jobapplications/${applicationId}/`, {
        application_status: status,
      });
      // Update the jobApplications state to reflect the updated status
      const updatedApplications = jobApplications.map((application) =>
        application.id === applicationId
          ? { ...application, application_status: status }
          : application
      );
      console.log("updatedApplications", updatedApplications);
      setJobApplications(updatedApplications);
    } catch (error) {
      console.log(error);
    }
  };

  // Dropdown menu for changing the application status

  //const options = ["Pending", "Approved", "Rejected"];
  //https://mui.com/material-ui/react-button-group/
  //beed options for the dropdown menu but will start with an empty array that we fill with the existing options
  let options = [];

  let existingOptions = new Set(
    jobApplications.map((jobApplication) => jobApplication.application_status)
  );

  if (!existingOptions.has("Pending")) {
    existingOptions.add("Pending");
  }

  if (!existingOptions.has("Approved")) {
    existingOptions.add("Approved");
  }

  if (!existingOptions.has("Rejected")) {
    existingOptions.add("Rejected");
  }

  options.forEach((option) => existingOptions.add(option));

  const existingOptionsArray = Array.from(existingOptions);

  options.forEach((option) => {
    if (!existingOptions.includes(option)) {
      existingOptions.push(option);
    }
  });



  // Add missing options to the existingOptions set
  options.forEach((option) => existingOptions.add(option));

  options= Array.from(existingOptions); //go back to an array

  //console.log("options", options);

  const handleClick = () => {
    setOpen(true);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    if (index >= 0) {
      const selectedStatus = options[index];
      const applicationId = jobApplications[index].id;
      handleChangeStatus(selectedStatus, applicationId);
      
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
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
                  <TableCell align="center">Feebacks</TableCell>
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

                  const selectedStatus =
                    selectedIndex === index ? options[selectedIndex] : null;

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
                        {jobApplication.application_feedback}
                        </TableCell>
                      <TableCell align="center">
                        <ButtonGroup
                          variant="contained"
                          ref={anchorRef}
                          aria-label="split button"
                          color={chipColor}
                        >
                          <Button onClick={handleClick}>
                            {selectedStatus || status}
                          </Button>
                          <Button
                            size="small"
                            aria-controls={
                              open ? "split-button-menu" : undefined
                            }
                            aria-expanded={open ? "true" : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                          >
                            <ArrowDropDownIcon />
                          </Button>
                        </ButtonGroup>
                        <Popper
                          open={open && selectedIndex === index}
                          anchorEl={anchorRef.current}
                          role={undefined}
                          transition
                          disablePortal
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                              }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList
                                    id="split-button-menu"
                                    autoFocusItem
                                  >
                                    {existingOptionsArray.map(
                                      (option, index) => (
                                        <MenuItem
                                          key={option}
                                          selected={index === selectedIndex}
                                          onClick={(event) =>
                                            handleMenuItemClick(event, index)
                                          }
                                        >
                                          {option}
                                        </MenuItem>
                                      )
                                    )}
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
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
