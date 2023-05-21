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
import Button  from "@mui/material/Button";

const Profile = ({ baseUrl }) => {
  console.log(baseUrl);
  //Fetch the current user
  const [currentUser, setCurrentUser] = useState({});
  const [jobSeeker, setJobSeeker] = useState({});

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

  console.log("current user is ", currentUser);

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

  console.log("job seeker is ", jobSeeker);

  //=======================================================//
  //Style for the list
  const style = {
    width: "100%",
    bgcolor: "background.paper",
  };

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
          <Button 
          component={Link}
                to="/update-user">
                    Update Profile
                    </Button>
          <Button
          component={Link}
          to="/delete-user"
          >Delete Profile</Button>
          <Button>Share Profile with Employers</Button>

          <Divider textAlign="left" style={{ padding: 20 }}>
            <Chip label="CONTACT INFO" />
          </Divider>
          <Typography>Phone Number: {jobSeeker.phone}</Typography>
          <Typography>Email: {currentUser.email}</Typography>
          <Typography>Location: {jobSeeker.location}</Typography>

          <Divider textAlign="left" style={{ padding: 20 }}>
            <Chip label="ABOUT ME" />
          </Divider>
          <Typography
            variant="h5"
            style={{ padding: 20, marginTop: 20, marginBottom: 20 }}
          >
            {jobSeeker.bio}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <img
            src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
            alt="profile"
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
