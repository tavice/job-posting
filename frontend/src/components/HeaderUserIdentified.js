import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    <div className='header-user-identified-main'>
    {localStorage.getItem("token") ? (
    <div className='header-user-identified'>
        <StyledLink to="/profile">My Dashboard</StyledLink>
        <StyledLink to="/current-job">Current Job</StyledLink>
        <StyledLink to="/current-job-listings">Current Job Listings</StyledLink>

    </div>
    ) : (
        <h2> Sign in For More Information</h2>
    )}
    </div>
  )
}

export default HeaderUserIdentified