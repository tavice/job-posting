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
text-transform: uppercase;
font-size: 1.5rem;
margin: 0 1rem;
&:hover {
  color: #000;
}
`;

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" style={{ background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)', padding:20}}>
     
    {localStorage.getItem("user_type") === 'J' ? (
    <div className='header-user-identified'>
        <StyledLink to="/dashboard">My Dashboard</StyledLink>
        <StyledLink to="/offer-gpt">Create Resume enhanced by AI</StyledLink>
        <StyledLink to="/create-your-resume">Upload your Resume</StyledLink>
       

    </div>
       ) : localStorage.getItem("user_type") === 'E' ? (
        <div className='header-user-identified'>
          <StyledLink to="/dashboard">My Dashboard</StyledLink>
          <StyledLink to="/offer-gpt">Create Job offers enhanced by AI</StyledLink>
          <StyledLink to="/create-your-job-offer">Create your Job Offer !</StyledLink>
          <StyledLink to="/find-candidates">Find candidates</StyledLink>

          
        </div>
    ) : (
      <Typography variant='h4' style={{textTransform:'uppercase'}}>Welcome! Sign in For More Information</Typography>
    )}
     
      </AppBar>
    </Box>
  )
}

export default HeaderUserIdentified