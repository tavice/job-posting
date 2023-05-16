import React from 'react'
import { Link } from "react-router-dom";
//import styled from "styled-components";

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';


const HeaderUserIdentified = () => {
//This header will be displayed when the user is logged in just underneath the main header
//It will display the user's name and a link to their profile page
//it will alsi display a link to current job they applied to if they are a job seeker or the current job listings they posted if they are an employer

const StyledLink = styled(Link)`
color: #fff;
text-decoration: none;
font-size: 1.5rem;
margin: 0 1rem;
&:hover {
  color: #000;
}
`;

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" style={{ backgroundColor: 'rgba(252, 70, 107, 0.6)', padding:20}}>
     
    {localStorage.getItem("token") ? (
    <div className='header-user-identified'>
        <StyledLink to="/profile">My Dashboard</StyledLink>
        <StyledLink to="/current-job">Current Job</StyledLink>
        <StyledLink to="/current-job-listings">Current Job Listings</StyledLink>

    </div>
    ) : (
      <Typography variant='h4'>Welcome! Sign in For More Information</Typography>
    )}
     
      </AppBar>
    </Box>
  )
}

export default HeaderUserIdentified