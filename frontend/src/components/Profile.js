import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const Profile = ({ baseUrl }) => {
  //console.log(baseUrl);
  const userType = localStorage.getItem("user_type");

  const [currentUser, setCurrentUser] = useState({});
  const [jobSeeker, setJobSeeker] = useState({});
  const [employer, setEmployer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //=======================================================//
  //Fetch the current user the user id in the database matches the authenticated_user  id saved in local storage when logged
  //Do it in one fetch to optimize had issues before with (3) fetches
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/user/${localStorage.getItem("authenticated_user")}`
        );
        const { data } = response;
        setCurrentUser(data);
        const jobSeekerResponse = await axios.get(`${baseUrl}/api/jobseekers`);
        const employerResponse = await axios.get(`${baseUrl}/api/employers`);
        const jobSeekerData = jobSeekerResponse.data.find(
          (item) => item.user === data.id
        );
        const employerData = employerResponse.data.find(
          (item) => item.user === data.id
        );
        if (jobSeekerData) {
          setJobSeeker(jobSeekerData);
        } else {
          console.log("no job seeker found");
        }
        if (employerData) {
          setEmployer(employerData);
        } else {
          console.log("no employer found");
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  //=======================================================//
  //Delete user

  const deleteUser = async () => {
    try {
      await axios.delete(`${baseUrl}/api/user/${currentUser.id}`);
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  //=======================================================//
  //Style for the list
  const style = {
    width: "100%",
    bgcolor: "background.paper",
  };

  //=======================================================//
  //render//

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }


  return (
    <Box style={{ textAlign: "left" }}>
      <Typography variant="h3" style={{ padding: 20 }}>
        {currentUser.first_name} {currentUser.last_name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <Divider textAlign="left" style={{ padding: 20 }}>
            <Chip label="PROFILE" />
          </Divider>

          <Typography variant="h6">
            <Avatar
              alt={currentUser.first_name}
              src="/static/images/avatar/1.jpg"
            />
            Username: {currentUser.username}
          </Typography>
          <Button component={Link} to="/update-user">
            Update Profile
          </Button>
          <Button component={Link} onClick={deleteUser}>
            Delete Profile
          </Button>

          {userType === "J" ? (
               <Button>Share Profile with Employers</Button>
          ):(
            <Button>Share Profile with Job Seekers</Button>
          )}
         

          <Divider textAlign="left" style={{ padding: 20 }}>
            <Chip label="CONTACT INFO" />
          </Divider>
          {userType === "J" ? (
            <div>
              <Typography>Phone Number: {jobSeeker.phone}</Typography>
              <Typography>Email: {currentUser.email}</Typography>
              <Typography>Location: {jobSeeker.location}</Typography>
            </div>
          ) : (
            <div>
              <Typography>Company Name: {employer.companyname}</Typography>
              <Typography>Company Phone Number: {employer.phone}</Typography>
              <Typography>
                Company Website: <Link>{employer.website}</Link>
              </Typography>
              <Typography>Email: {currentUser.email}</Typography>
              <Typography>Location: {employer.location}</Typography>
            </div>
          )}

          {userType === "J" ? (
            <div>
              <Divider textAlign="left" style={{ padding: 20 }}>
                <Chip label="ABOUT ME" />
              </Divider>
              <Typography
                variant="h5"
                style={{ padding: 20, marginTop: 20, marginBottom: 20 }}
              >
                {jobSeeker.bio}
              </Typography>
            </div>
          ) : (
            <div>
            <Divider textAlign="left" style={{ padding: 20 }}>
              <Chip label="ABOUT COMPANY" />
              </Divider>
  
              </div>
           
          )}

        
        </Grid>
        <Grid item xs={6} md={6}>
          <img
            src="https://picsum.photos/200/300"
            alt="profile"
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
